import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

/**
 * 방 정보를 생성할 때 사용할 'participantIds' 형식
 * - 원하는 만큼 참여자를 넣어 1:1 또는 1:N 모두 처리 가능
 */
interface CreateRoomPayload {
  hostId: string;         // 방을 생성한 사람 (옵션)
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

  // ChatService 주입
  constructor(private readonly chatService: ChatService) {}

  // 소켓 연결 시
  handleConnection(socket: Socket) {
    console.log('클라이언트 연결:', socket.id);
  }

  // 소켓 연결 해제 시
  handleDisconnect(socket: Socket) {
    console.log('클라이언트 연결 해제:', socket.id);
    // Service 호출
    this.chatService.disconnectUserBySocketId(socket.id);
  }

  /**
   * 유저 등록
   * - (예) socket.emit('register', { userId: 'userA' });
   * - 이미 같은 userId로 등록된 소켓이 있다면 거부할 수도 있음
   */
  @SubscribeMessage('register')
  handleRegister(socket: Socket, payload: { userId: string }) {
    const { userId } = payload;
    const ok = this.chatService.registerUser(userId, socket.id);
    // 중복 접속 제어 (정책에 따라)
    if (!ok) {
      console.log(`이미 userId=${userId}로 연결된 소켓이 존재합니다.`);
      socket.emit('system', { content: `userId=${userId}가 이미 존재합니다.` });
      socket.disconnect(true);
      return;
    }

    console.log(`유저 등록: userId=${userId}, socketId=${socket.id}`);
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
    const { roomId, allParticipants } = this.chatService.createRoom(hostId, participants);

    // 각 참여자별로 userRoomsMap에 roomId 추가 & 실제 소켓 join
    allParticipants.forEach((userId) => {
      const sockId = this.chatService.getSocketId(userId);
      if (sockId) {
        const userSocket = this.server.sockets.sockets.get(sockId);
        userSocket?.join(roomId);
      }
    });

    // 생성된 roomId를 모든 room 참가자에게 알림
    this.server.to(roomId).emit('room_created', {
      roomId,
      participants: allParticipants,
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
    const result = this.chatService.joinRoom(userId, roomId);
    if (!result.success) {
      socket.emit('system', { content: `존재하지 않는 방: ${roomId}` });
      return;
    }

    // 실제 소켓 join
    const socketId = this.chatService.getSocketId(userId);
    if (socketId) {
      const userSocket = this.server.sockets.sockets.get(socketId);
      userSocket?.join(roomId);
    }

    // 새로운 참가자 알림
    this.server.to(roomId).emit('system', {
      content: `${userId} joined room: ${roomId}`,
    });
    console.log(`유저 ${userId}가 방 ${roomId}에 참여했습니다.`);

    // 생성된 roomId를 모든 room 참가자에게 알림
    this.server.to(roomId).emit('room_created', {
      roomId,
      participants: result.participants,
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
    this.chatService.leaveRoom(userId, roomId);

    // 실제 소켓 leave
    const socketId = this.chatService.getSocketId(userId);
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

  @SubscribeMessage('typing')
  handleSendingMessage(socket: Socket, payload: { userId: string; roomId: string; }) {
    const { userId, roomId } = payload;

    this.server.to(roomId).emit('typing', userId);
  }
}