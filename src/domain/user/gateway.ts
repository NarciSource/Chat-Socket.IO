import { Namespace, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { GetUserQuery } from './queries';
import { DisconnectUserCommand, RegisterUserCommand } from './commands';

export interface Payload {
  userId?: string; // 유저 식별자
}

@Injectable()
export default class UserGateway {
  public server: Namespace;

  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  /**
   * 유저 등록
   * - 이미 같은 userId로 등록된 소켓이 있다면 거부할 수도 있음
   */
  async handleRegister(socket: Socket, payload: Payload) {
    const { userId } = payload;

    const command = new RegisterUserCommand({ userId, socketId: socket.id });
    const ok = await this.commandBus.execute(command);

    // 중복 접속 제어 (정책에 따라)
    if (!ok) {
      console.log(`이미 userId=${userId}로 연결된 소켓이 존재합니다.`);

      socket.emit('system', { content: `userId=${userId}가 이미 존재합니다.` });
      socket.disconnect(true);

      return;
    }

    console.log(`유저 등록: userId=${userId}, socketId=${socket.id}`);

    this.server.emit('get_users', {
      users: await this.queryBus.execute(new GetUserQuery()),
    });
  }

  async handleUserDisconnected(socket: Socket) {
    const command = new DisconnectUserCommand(socket.id);
    await this.commandBus.execute(command);
  }
}
