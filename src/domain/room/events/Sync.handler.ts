import { Namespace } from 'socket.io';
import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import SyncEvent from './Sync.event';

@EventsHandler(SyncEvent)
export default class SyncHandler implements IEventHandler<SyncEvent> {
  constructor(
    @Inject('SOCKET_SERVER')
    private readonly _server: () => Namespace,
  ) {}

  get server() {
    return this._server();
  }

  handle({ eventName, roomId, socketIds }: SyncEvent) {
    // 서버 간 동기화를 위해 모든 서버 인스턴스에 이벤트를 전달
    for (const socketId of socketIds) {
      this.broadcastServerEvent(eventName, socketId, roomId);
    }
  }

  private broadcastServerEvent(event: string, ...args: string[]) {
    // 자신 서버
    this.server.listeners(event).forEach((listener) => listener(...args));
    // 다른 서버
    this.server.serverSideEmit(event, ...args);
  }
}
