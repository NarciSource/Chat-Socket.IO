import { Namespace, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { WebSocketGateway } from '@nestjs/websockets';

/**
 * 메시지 전송시 사용할 payload
 */
export interface SendMessagePayload {
  roomId: string; // 메시지를 전송할 방
  senderId: string; // 보낸 사람
  content: string; // 메시지 내용
}

@Injectable()
@WebSocketGateway()
export default class ChatGateway {
  public server: Namespace;

  /**
   * 메시지 전송 - 1:1도, 1:N도 모두 동일 로직
   *  - (예) socket.emit('send_message', {
   *        roomId: 'abc123',
   *        senderId: 'userA',
   *        content: '안녕하세요'
   *     });
   */
  handleSendMessage(socket: Socket, payload: SendMessagePayload) {
    const { roomId, senderId, content } = payload;

    // 방에 속해있는 모든 소켓에게 메시지 전송
    this.server.to(roomId).emit('receive_message', {
      senderId,
      content,
      roomId,
    });
  }

  handleSendingMessage(_socket: Socket, payload: { userId: string; roomId: string }) {
    const { userId, roomId } = payload;

    this.server.to(roomId).emit('typing', userId);
  }
}
