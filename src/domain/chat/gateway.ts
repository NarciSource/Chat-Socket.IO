import { Namespace, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { WebSocketGateway } from '@nestjs/websockets';

export interface Payload {
  senderId?: string; // 보낸 식별자
  roomId?: string; // 방 식별자
  content?: string; // 메시지 내용
}

@Injectable()
@WebSocketGateway()
export default class ChatGateway {
  public server: Namespace;

  /**
   * 메시지 전송 - 1:1도, 1:N도 모두 동일 로직
   */
  handleSendMessage(_socket: Socket, payload: Payload) {
    const { roomId, senderId, content } = payload;

    // 방에 속해있는 모든 소켓에게 메시지 전송
    this.server.to(roomId).emit('receive_message', {
      senderId,
      content,
      roomId,
    });
  }

  handleSendingMessage(_socket: Socket, payload: Payload) {
    const { senderId, roomId } = payload;

    this.server.to(roomId).emit('typing', senderId);
  }
}
