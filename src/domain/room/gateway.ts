import { Namespace, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { CreateRoomEvent, JoinRoomEvent, LeaveRoomEvent } from './commands';

export interface Payload {
  userId?: string; // 유저 식별자
  roomId?: string; // 방 식별자
  hostId?: string; // 방을 생성한 사람
  participants?: string[]; // 방에 들어갈 유저들의 목록
}

@Injectable()
export default class RoomGateway {
  public server: Namespace;

  constructor(private readonly commandBus: CommandBus) {}

  /**
   * 방 생성 이벤트 (1:1 ~ 1:N 모두 처리)
   */
  async handleCreateRoom(_socket: Socket, { hostId, participants }: Payload) {
    const command = new CreateRoomEvent(hostId, participants);

    await this.commandBus.execute(command);

    console.log(`유저 ${hostId}가 방을 만들었습니다.`);
  }

  /**
   * 방에 직접 join하는 이벤트
   * (이미 생성된 roomId에 대해, 특정 user가 뒤늦게 참여할 수 있음)
   */
  async handleJoinRoom(_socket: Socket, { userId, roomId }: Payload) {
    const command = new JoinRoomEvent(userId, roomId);

    await this.commandBus.execute(command);

    console.log(`유저 ${userId}가 방 ${roomId}에 참여했습니다.`);
  }

  /**
   * 방 떠나기
   */
  async handleLeaveRoom(_socket: Socket, { userId, roomId }: Payload) {
    const command = new LeaveRoomEvent(userId, roomId);

    await this.commandBus.execute(command);

    console.log(`유저 ${userId}가 방 ${roomId}에서 나갔습니다.`);
  }
}
