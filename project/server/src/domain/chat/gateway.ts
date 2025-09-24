import { Namespace, Socket } from 'socket.io';
import { EventBus } from '@nestjs/cqrs';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

import { EmitEvent } from '../shared/events';

export interface Payload {
  userId?: string; // 보낸 식별자
  roomId?: string; // 방 식별자
  content?: string; // 메시지 내용
}

@WebSocketGateway({
  path: '/chat/ws',
  namespace: '/chat',
  cors: { origin: '*' },
})
export default class ChatGateway {
  @WebSocketServer()
  public server: Namespace;

  constructor(private readonly eventBus: EventBus) {}

  /**
   * 메시지 전송 - 1:1도, 1:N도 모두 동일 로직
   */
  @SubscribeMessage('send_message')
  handleSendMessage(_socket: Socket, { roomId, userId, content }: Payload) {
    // 방에 속해있는 모든 소켓에게 메시지 전송
    const emitEvent = new EmitEvent('receive_message', roomId, {
      userId,
      content,
      roomId,
    });

    this.eventBus.publish(emitEvent);
  }

  @SubscribeMessage('typing')
  handleSendingMessage(_socket: Socket, { userId, roomId }: Payload) {
    const emitEvent = new EmitEvent('typing', roomId, userId);

    this.eventBus.publish(emitEvent);
  }
}
