import { Namespace, Socket } from 'socket.io';
import { WebSocketGateway, WebSocketServer, OnGatewayConnection } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  path: '/chat/ws',
  namespace: '/chat',
  cors: { origin: '*' },
})
export class CoreGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Namespace;

  private logger = new Logger(CoreGateway.name);

  constructor() {}

  afterInit() {
    this.logger.log('소켓 서버 초기화 완료');
  }

  // 소켓 연결 시
  handleConnection(socket: Socket) {
    console.log('클라이언트 연결:', socket.id);
  }

  public getServer() {
    return this.server;
  }
}
