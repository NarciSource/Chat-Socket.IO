import { Namespace, Socket } from 'socket.io';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';

import { UserGateway } from 'src/domain/user';
import { CreateRoomPayload, RoomGateway, RoomEventsHandler } from 'src/domain/room';
import { ChatGateway, SendMessagePayload } from 'src/domain/chat';

@WebSocketGateway({
  path: '/chat/ws',
  namespace: '/chat',
  cors: {
    origin: '*', // 실제 배포 시에는 허용할 도메인을 명시
  },
})
export class CoreGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Namespace;

  private logger = new Logger(CoreGateway.name);

  constructor(
    private readonly userGateway: UserGateway,
    private readonly roomGateway: RoomGateway,
    private readonly chatGateway: ChatGateway,
    private readonly roomEventHandler: RoomEventsHandler,
  ) {}

  afterInit() {
    this.userGateway.server = this.server;
    this.roomGateway.server = this.server;
    this.chatGateway.server = this.server;

    this.roomEventHandler.server = this.server;
    this.roomEventHandler.handle();

    this.logger.log('소켓 서버 초기화 완료');
  }

  // 소켓 연결 시
  handleConnection(socket: Socket) {
    console.log('클라이언트 연결:', socket.id);
  }

  // 소켓 연결 해제 시
  async handleDisconnect(socket: Socket) {
    await this.userGateway.handleUserDisconnected(socket);

    console.log('클라이언트 연결 해제:', socket.id);
  }

  // user
  @SubscribeMessage('register')
  async handleRegister(socket: Socket, payload: { userId: string }) {
    return this.userGateway.handleRegister(socket, payload);
  }

  // room
  @SubscribeMessage('create_room')
  async handleCreateRoom(socket: Socket, payload: CreateRoomPayload) {
    return this.roomGateway.handleCreateRoom(socket, payload);
  }
  @SubscribeMessage('join_room')
  async handleJoinRoom(socket: Socket, payload: { userId: string; roomId: string }) {
    return this.roomGateway.handleJoinRoom(socket, payload);
  }
  @SubscribeMessage('leave_room')
  async handleLeaveRoom(socket: Socket, payload: { userId: string; roomId: string }) {
    return this.roomGateway.handleLeaveRoom(socket, payload);
  }

  // chat
  @SubscribeMessage('send_message')
  handleSendMessage(socket: Socket, payload: SendMessagePayload) {
    return this.chatGateway.handleSendMessage(socket, payload);
  }
  @SubscribeMessage('typing')
  handleSendingMessage(socket: Socket, payload: { userId: string; roomId: string }) {
    return this.chatGateway.handleSendingMessage(socket, payload);
  }
}
