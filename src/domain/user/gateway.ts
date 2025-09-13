import { Namespace, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { DisconnectUserCommand, RegisterUserCommand } from './commands';

export interface Payload {
  userId?: string; // 유저 식별자
}

@Injectable()
export default class UserGateway {
  public server: Namespace;

  constructor(private readonly commandBus: CommandBus) {}

  /**
   * 유저 등록
   * - 이미 같은 userId로 등록된 소켓이 있다면 거부할 수도 있음
   */
  async handleRegister({ id: socketId }: Socket, { userId }: Payload) {
    const command = new RegisterUserCommand({ userId, socketId });

    await this.commandBus.execute(command);

    console.log(`유저 등록: userId=${userId}, socketId=${socketId}`);
  }

  async handleUserDisconnected({ id: socketId }: Socket) {
    const command = new DisconnectUserCommand(socketId);

    await this.commandBus.execute(command);

    console.log(`소켓 해제: socketId=${socketId}`);
  }
}
