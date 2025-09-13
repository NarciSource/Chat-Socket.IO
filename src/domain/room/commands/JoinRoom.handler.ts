import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus, EventBus } from '@nestjs/cqrs';

import { IRepository } from 'src/repository';
import { GetSocketIdQuery } from '../queries';
import { EmitEvent, SyncEvent } from '../events';
import JoinRoomCommand from './JoinRoom.command';

@CommandHandler(JoinRoomCommand)
export default class JoinRoomHandler implements ICommandHandler<JoinRoomCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,

    @Inject('IRepository')
    private readonly repository: IRepository,
  ) {}

  async execute({ userId, roomId }: JoinRoomCommand) {
    const members = await this.repository.getRoomMembers(roomId);

    if (!members) {
      const content = `존재하지 않는 방입니다.`;
      const systemEvent = new EmitEvent('system', roomId, { content });

      this.eventBus.publish(systemEvent);
      return false;
    }

    // 레포지토리 로직
    await this.repository.addRoomToUser(userId, roomId);

    // 서버 간 동기화 이벤트
    const socketId = await this.queryBus.execute(new GetSocketIdQuery(userId));
    const syncEvent = new SyncEvent('join-room', roomId, [socketId]);

    // 시스템 메시지
    const content = `${userId}님이 방에 참여했습니다.`;
    const systemEvent = new EmitEvent('system', roomId, { content });

    // 새로운 참가자 알림
    const notifyEvent = new EmitEvent('room_created', roomId, { roomId, participants: members });

    this.eventBus.publishAll([syncEvent, systemEvent, notifyEvent]);

    return true;
  }
}
