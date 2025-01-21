import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  
  interface MessagePayload {
    senderId: string;    // 메시지를 보낸 사람
    recipientId: string; // 메시지를 받을 사람
    content: string;     // 메시지 내용
  }
  
  @WebSocketGateway({
    cors: {
      origin: '*', // 실제 배포 시에는 필요한 도메인만 열어두는 것이 좋습니다.
    },
  })
  export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
  
    // userId -> socketId 매핑을 위한 Map
    private userSocketMap: Map<string, string> = new Map();
  
    // 1) 클라이언트 연결 시
    handleConnection(client: Socket) {
      console.log(`클라이언트 연결: ${client.id}`);
    }
  
    // 2) 클라이언트 연결 해제 시
    handleDisconnect(client: Socket) {
      console.log(`클라이언트 연결 해제: ${client.id}`);
  
      // userSocketMap에서 해당 소켓을 사용 중인 user를 찾아 제거
      for (const [userId, socketId] of this.userSocketMap.entries()) {
        if (socketId === client.id) {
          this.userSocketMap.delete(userId);
          break;
        }
      }
    }
  
    /**
     * 클라이언트가 본인의 userId를 등록하는 이벤트
     * (예) 클라이언트에서 "register" 이벤트로 { userId: '123' } 전송
     * 
     * - 이미 동일한 userId가 등록되어 있다면, 추가 등록(새 소켓) 불가 → 새 연결 거부
     */
    @SubscribeMessage('register')
    handleRegister(client: Socket, data: { userId: string }) {
      const { userId } = data;
  
      // 이미 해당 userId가 등록되어 있는 경우 → 새 연결 거부
      if (this.userSocketMap.has(userId)) {
        console.log(`이미 userId=${userId} 로 등록된 소켓이 존재합니다. 새 연결 거부.`);
        client.emit('register_failed', {
          message: `이미 userId=${userId}로 연결된 소켓이 있습니다.`,
        });
        // 클라이언트 연결 해제
        client.disconnect(true);
        return;
      }
  
      // userId가 없다면 정상 등록
      this.userSocketMap.set(userId, client.id);
      console.log(`유저 등록: userId=${userId}, socketId=${client.id}`);
    }
  
    /**
     * 1:1 메시지 전송을 처리하는 이벤트
     * (예) 클라이언트에서 "send_message" 이벤트로 { senderId, recipientId, content } 전송
     */
    @SubscribeMessage('send_message')
    handleSendMessage(client: Socket, payload: MessagePayload) {
      const { senderId, recipientId, content } = payload;
      const recipientSocketId = this.userSocketMap.get(recipientId);
  
      if (!recipientSocketId) {
        // 상대방이 접속 중이 아닐 수도 있음
        console.log(`받는 유저(${recipientId})가 현재 접속 상태가 아님`);
        return;
      }
  
      // 상대방에게 이벤트 전송
      this.server.to(recipientSocketId).emit('receive_message', {
        senderId,
        content,
      });
    }
  }  