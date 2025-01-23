import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

/**
 * 방 정보를 생성할 때 사용할 'participantIds' 형식
 * - 원하는 만큼 참여자를 넣어 1:1 또는 1:N 모두 처리 가능
 */
interface CreateRoomPayload {
  hostId: string;          // 방을 생성한 사람 (옵션)
  participants: string[]; // 이 방에 들어갈 유저들의 userId 목록
}

/**
 * 메시지 전송시 사용할 payload
 */
interface SendMessagePayload {
  roomId: string;   // 메시지를 전송할 방
  senderId: string; // 보낸 사람
  content: string;  // 메시지 내용
}

@WebSocketGateway({
  cors: {
    origin: '*', // 실제 배포 시에는 허용할 도메인을 명시
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  /**
   * 1) userId -> socketId
   *    사용자 하나당 현재 연결된 소켓(1개)을 추적
   */
  private userSocketMap: Map<string, string> = new Map();

  /**
   * 2) userId -> Set<roomId>
   *    유저가 어떤 방들에 들어가 있는지
   */
  private userRoomsMap: Map<string, Set<string>> = new Map();

  /**
   * 3) roomId -> Set<userId>
   *    어떤 방에 어떤 유저들이 참여 중인지
   */
  private roomMembersMap: Map<string, Set<string>> = new Map();

  // 소켓 연결 시
  handleConnection(socket: Socket) {
    console.log('클라이언트 연결:', socket.id);
  }

  // 소켓 연결 해제 시
  handleDisconnect(socket: Socket) {
    console.log('클라이언트 연결 해제:', socket.id);

    // userSocketMap에서 socket.id를 사용 중인 userId 찾기
    for (const [userId, socketId] of this.userSocketMap.entries()) {
      if (socketId === socket.id) {
        this.userSocketMap.delete(userId);

        // userRoomsMap에서 해당 유저가 참여 중이던 roomId들을 구해
        const rooms = this.userRoomsMap.get(userId) || new Set();
        // roomMembersMap에서 이 유저를 제거
        rooms.forEach((roomId) => {
          const members = this.roomMembersMap.get(roomId);
          if (members) {
            members.delete(userId);

            // 방에 남은 사람이 0명이라면, roomMembersMap에서 방을 삭제해도 됨 (정책에 따라)
            if (members.size === 0) {
              this.roomMembersMap.delete(roomId);
              console.log(`방 ${roomId}가 비어 삭제됨`);
            }
          }
        });
        // userRoomsMap에서도 유저 제거
        this.userRoomsMap.delete(userId);

        break;
      }
    }
  }

  /**
   * 유저 등록
   * - (예) socket.emit('register', { userId: 'userA' });
   * - 이미 같은 userId로 등록된 소켓이 있다면 거부할 수도 있음
   */
  @SubscribeMessage('register')
  handleRegister(socket: Socket, payload: { userId: string }) {
    const { userId } = payload;

    // 중복 접속 제어 (정책에 따라)
    if (this.userSocketMap.has(userId)) {
      console.log(`이미 userId=${userId}로 연결된 소켓이 존재합니다.`);
      socket.emit('system', { content: `userId=${userId}가 이미 존재합니다.` });
      socket.disconnect(true);
      return;
    }

    this.userSocketMap.set(userId, socket.id);
    this.userRoomsMap.set(userId, new Set()); // 초기화
    console.log(`유저 등록: userId=${userId}, socketId=${socket.id}`);
  }

  /**
   * 랜덤한 roomId 생성 - 예시(간단 버전)
   * - 실제로는 UUID, nanoid 등 라이브러리 사용 권장
   */
  private generateRandomRoomId(): string {
    // 6자리 알파벳/숫자 조합 (간단 예시)
    return Math.random().toString(36).substring(2, 8);
  }

  /**
   * 방 생성 이벤트 (1:1 ~ 1:N 모두 처리)
   *  - (예) socket.emit('create_room', {
   *        hostId: 'userA',
   *        participantIds: ['userA','userB','userC'] 
   *     });
   *  -> server가 랜덤 roomId를 만들어 roomMembersMap에 저장
   *  -> 해당 참여자들(userA,B,C)이 현재 소켓 연결 중이면 자동으로 room에 join
   *  -> roomId를 클라이언트에 반환 (필요시)
   */
  @SubscribeMessage('create_room')
  handleCreateRoom(socket: Socket, payload: CreateRoomPayload) {
    const { hostId, participants } = payload;

    // 새 roomId 생성
    const roomId = this.generateRandomRoomId();
    // 참여자 목록을 Set으로 만들어 roomMembersMap에 등록
    this.roomMembersMap.set(roomId, new Set(participants));

    // 각 참여자별로 userRoomsMap에 roomId 추가 & 실제 소켓 join
    participants.forEach((userId) => {
      const userSet = this.userRoomsMap.get(userId);
      if (userSet) {
        userSet.add(roomId);
      } else {
        this.userRoomsMap.set(userId, new Set([roomId]));
      }

      // 소켓이 현재 연결되어 있으면 roomId에 join
      const socketId = this.userSocketMap.get(userId);
      if (socketId) {
        const userSocket = this.server.sockets.sockets.get(socketId);
        userSocket?.join(roomId);
      }
    });

    console.log(`방 생성: roomId=${roomId}, 참가자=${participants.join(', ')}`);

    // 생성된 roomId를 요청 보낸 클라이언트에게 알림
    socket.emit('room_created', {
      roomId,
      participants,
    });
  }

  /**
   * 방에 직접 join하는 이벤트
   * (이미 생성된 roomId에 대해, 특정 user가 뒤늦게 참여할 수 있음)
   *  - (예) socket.emit('join_room', { userId:'userA', roomId:'abc123' })
   */
  @SubscribeMessage('join_room')
  handleJoinRoom(socket: Socket, payload: { userId: string; roomId: string }) {
    const { userId, roomId } = payload;
    const roomMembers = this.roomMembersMap.get(roomId);

    if (!roomMembers) {
      // 없는 방이면 에러
      socket.emit('system', { content: `존재하지 않는 방입니다: ${roomId}` });
      return;
    }

    // 해당 방에 user를 추가
    roomMembers.add(userId);
    // userRoomsMap에도 추가
    const participants = this.userRoomsMap.get(userId) || new Set();
    participants.add(roomId);
    this.userRoomsMap.set(userId, participants);

    // 실제 소켓 join
    const socketId = this.userSocketMap.get(userId);
    if (socketId) {
      const userSocket = this.server.sockets.sockets.get(socketId);
      userSocket?.join(roomId);
    }

    // 알림 (옵션)
    this.server.to(roomId).emit('system', {
      content: `${userId} joined room: ${roomId}`,
    });
    console.log(`유저 ${userId}가 방 ${roomId}에 참여했습니다.`);

    this.server.to(userId).emit('room_created', {
      roomId,
      participants,
    })
  }

  /**
   * 메시지 전송 - 1:1도, 1:N도 모두 동일 로직
   *  - (예) socket.emit('send_message', {
   *        roomId: 'abc123',
   *        senderId: 'userA',
   *        content: '안녕하세요'
   *     });
   */
  @SubscribeMessage('send_message')
  handleSendMessage(socket: Socket, payload: SendMessagePayload) {
    const { roomId, senderId, content } = payload;
    const roomMembers = this.roomMembersMap.get(roomId);

    if (!roomMembers) {
      // 없는 방
      console.log(`send_message 실패: room ${roomId} 존재 안 함`);
      return;
    }
    // 방에 속해있는 모든 소켓에게 메시지 전송
    this.server.to(roomId).emit('receive_message', {
      senderId,
      content,
      roomId,
    });
  }

  /**
   * 방 떠나기
   *  - (예) socket.emit('leave_room', { userId:'userB', roomId:'abc123' })
   */
  @SubscribeMessage('leave_room')
  handleLeaveRoom(socket: Socket, payload: { userId: string; roomId: string }) {
    const { userId, roomId } = payload;
    const roomMembers = this.roomMembersMap.get(roomId);
    if (!roomMembers) {
      socket.emit('system', { content: `존재하지 않는 방입니다: ${roomId}` });
      return;
    }

    // 방 멤버 목록에서 제거
    roomMembers.delete(userId);
    if (roomMembers.size === 0) {
      this.roomMembersMap.delete(roomId);
      console.log(`모두 떠나서 방 ${roomId} 삭제`);
    }

    // userRoomsMap에서도 제거
    const userSet = this.userRoomsMap.get(userId);
    if (userSet) {
      userSet.delete(roomId);
    }

    // 실제 소켓 leave
    const socketId = this.userSocketMap.get(userId);
    if (socketId) {
      const userSocket = this.server.sockets.sockets.get(socketId);
      userSocket?.leave(roomId);
    }

    // 알림
    this.server.to(roomId).emit('system', {
      content: `${userId}님이 방을 떠났습니다.`,
    });
    console.log(`유저 ${userId}가 방 ${roomId}에서 나갔습니다.`);
  }
}