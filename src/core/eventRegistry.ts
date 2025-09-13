import { Namespace } from 'socket.io';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';

/**
 * # ServerEventRegistry
 *
 * ## 동기화 과정
 * 이벤트는 한 서버에서 발생하지만, 모든 서버로 전파됩니다.
 * 각 서버 인스턴스에서 해당 이벤트를 수신하고, 해당 소켓을 자신이 관리하는 방에 가입시키거나 탈퇴시킵니다.
 * 이를 통해 분산 서버 환경에서 모든 서버에서 동일한 소켓 상태를 유지할 수 있습니다.
 */
@Injectable()
export default class ServerEventRegistry implements OnModuleInit {
  constructor(
    @Inject('SOCKET_SERVER')
    private readonly _server: () => Namespace,
  ) {}

  onModuleInit() {
    this.server.on('join-room', (socketId: string, roomId: string) => {
      const socket = this.server.sockets.get(socketId);

      void socket?.join(roomId);
    });

    this.server.on('leave-room', (socketId: string, roomId: string) => {
      const socket = this.server.sockets.get(socketId);

      void socket?.leave(roomId);
    });
  }

  get server() {
    return this._server();
  }
}
