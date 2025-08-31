import { Namespace, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';

import { UserService } from './service';

@Injectable()
export class UserGateway {
  public server: Namespace;

  constructor(private readonly service: UserService) {}

  /**
   * 유저 등록
   * - (예) socket.emit('register', { userId: 'userA' });
   * - 이미 같은 userId로 등록된 소켓이 있다면 거부할 수도 있음
   */
  async handleRegister(socket: Socket, payload: { userId: string }) {
    const { userId } = payload;
    const ok = await this.service.registerUser(userId, socket.id);

    // 중복 접속 제어 (정책에 따라)
    if (!ok) {
      console.log(`이미 userId=${userId}로 연결된 소켓이 존재합니다.`);

      socket.emit('system', { content: `userId=${userId}가 이미 존재합니다.` });
      socket.disconnect(true);

      return;
    }

    console.log(`유저 등록: userId=${userId}, socketId=${socket.id}`);

    this.server.emit('get_users', {
      users: await this.service.getUsers(),
    });
  }

  async handleUserDisconnected(socket: Socket) {
    await this.service.disconnectUserBySocketId(socket.id);
  }
}
