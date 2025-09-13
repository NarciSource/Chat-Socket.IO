import { Namespace } from 'socket.io';
import { Global, Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import EmitEvent from './Emit.event';

@Global()
@EventsHandler(EmitEvent)
export default class EmitHandler implements IEventHandler<EmitEvent> {
  constructor(
    @Inject('SOCKET_SERVER')
    private readonly _server: () => Namespace,
  ) {}

  get server() {
    return this._server();
  }

  handle({ eventName, target, data }: EmitEvent) {
    // 특정 대상 소켓 또는 방에 socket.io 이벤트를 전송
    if (target) {
      this.server.to(target).emit(eventName, data);
    } else {
      this.server.emit(eventName, data);
    }
  }
}
