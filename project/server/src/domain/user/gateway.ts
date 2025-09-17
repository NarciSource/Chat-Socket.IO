import { Namespace, Socket } from 'socket.io';
import { CommandBus } from '@nestjs/cqrs';

import { DisconnectUserCommand, RegisterUserCommand } from './commands';
import {
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

export interface Payload {
  userId?: string; // 유저 식별자
}

@WebSocketGateway({
  path: '/chat/ws',
  namespace: '/chat',
  cors: { origin: '*' },
})
export default class UserGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server: Namespace;

  constructor(private readonly commandBus: CommandBus) {}

  // 소켓 연결 해제 시
  async handleDisconnect({ id: socketId }: Socket) {
    const command = new DisconnectUserCommand(socketId);
    await this.commandBus.execute(command);

    console.log('클라이언트 연결 해제:', socketId);
  }

  /**
   * 유저 등록
   * - 이미 같은 userId로 등록된 소켓이 있다면 거부할 수도 있음
   */
  @SubscribeMessage('register')
  async handleRegister({ id: socketId }: Socket, { userId }: Payload) {
    const command = new RegisterUserCommand({ userId, socketId });

    await this.commandBus.execute(command);

    console.log(`유저 등록: userId=${userId}, socketId=${socketId}`);
  }
}
