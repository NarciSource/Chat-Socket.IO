import { Namespace, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateRoomEvent, JoinRoomEvent, LeaveRoomEvent } from './commands';
import { GetSocketIdQuery } from './queries';

export interface Payload {
  userId?: string; // 유저 식별자
  roomId?: string; // 방 식별자
  hostId?: string; // 방을 생성한 사람
  participants?: string[]; // 방에 들어갈 유저들의 목록
}

@Injectable()
export default class RoomGateway {
  public server: Namespace;

  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  /**
   * 방 생성 이벤트 (1:1 ~ 1:N 모두 처리)
   */
  async handleCreateRoom(_socket: Socket, { hostId, participants }: Payload) {
    const command = new CreateRoomEvent(hostId, participants);

    const { roomId, participants: participantsWithHost } = await this.commandBus.execute(command);

    // 서버 간 동기화를 위해 모든 서버 인스턴스에 이벤트를 전달
    const queries = participantsWithHost.map((userId) => new GetSocketIdQuery(userId));
    const socketIds = await Promise.all(queries.map((q) => this.queryBus.execute(q)));
    for (const socketId of socketIds) {
      this.broadcastServerEvent('join-room', socketId, roomId);
    }

    // 생성된 roomId를 모든 room 참가자에게 알림
    this.server.to(roomId).emit('room_created', {
      roomId,
      participants: participantsWithHost,
    });
  }

  /**
   * 방에 직접 join하는 이벤트
   * (이미 생성된 roomId에 대해, 특정 user가 뒤늦게 참여할 수 있음)
   */
  async handleJoinRoom(self: Socket, { userId, roomId }: Payload) {
    const command = new JoinRoomEvent(userId, roomId);

    const result = await this.commandBus.execute(command);

    if (!result.success) {
      self.emit('system', { content: `존재하지 않는 방: ${roomId}` });
      return;
    }

    // 실제 소켓 join
    const socketId = await this.queryBus.execute(new GetSocketIdQuery(userId));
    if (!socketId) {
      return;
    }

    console.log(`유저 ${userId}가 방 ${roomId}에 참여했습니다.`);

    // 서버 간 동기화 이벤트
    this.broadcastServerEvent('join-room', socketId, roomId);

    // 새로운 참가자 알림
    this.server.to(roomId).emit('system', {
      content: `${userId} joined room: ${roomId}`,
    });

    this.server.to(roomId).emit('room_created', {
      roomId,
      participants: result.participants,
    });
  }

  /**
   * 방 떠나기
   */
  async handleLeaveRoom(_socket: Socket, { userId, roomId }: Payload) {
    const command = new LeaveRoomEvent(userId, roomId);

    await this.commandBus.execute(command);

    // 실제 소켓 leave
    const socketId = await this.queryBus.execute(new GetSocketIdQuery(userId));
    if (!socketId) {
      return;
    }

    console.log(`유저 ${userId}가 방 ${roomId}에서 나갔습니다.`);

    // 서버 간 동기화 이벤트
    this.broadcastServerEvent('leave-room', socketId, roomId);

    // 알림
    this.server.to(roomId).emit('system', {
      content: `${userId}님이 방을 떠났습니다.`,
    });
  }

  private broadcastServerEvent(event: string, ...args: string[]) {
    // 자신 서버
    this.server.listeners(event).forEach((listener) => listener(...args));
    // 다른 서버
    this.server.serverSideEmit(event, ...args);
  }
}
