import { Namespace, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { WebSocketGateway } from '@nestjs/websockets';

import { EmitEvent } from '../shared/events';

export interface Payload {
  senderId?: string; // 보낸 식별자
  roomId?: string; // 방 식별자
  content?: string; // 메시지 내용
}

@Injectable()
@WebSocketGateway()
export default class ChatGateway {
  public server: Namespace;

  constructor(private readonly eventBus: EventBus) {}

  /**
   * 메시지 전송 - 1:1도, 1:N도 모두 동일 로직
   */
  handleSendMessage(_socket: Socket, { roomId, senderId, content }: Payload) {
    // 방에 속해있는 모든 소켓에게 메시지 전송
    const emitEvent = new EmitEvent('receive_message', roomId, {
      senderId,
      content,
      roomId,
    });

    this.eventBus.publish(emitEvent);
  }

  handleSendingMessage(_socket: Socket, { senderId, roomId }: Payload) {
    const emitEvent = new EmitEvent('typing', roomId, senderId);

    this.eventBus.publish(emitEvent);
  }
}
