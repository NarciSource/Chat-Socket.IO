import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus, EventBus } from '@nestjs/cqrs';

import { EmitEvent, SyncEvent } from 'src/domain/shared/events';
import { IRepository } from 'src/repository';
import { GetSocketIdQuery } from '../queries';
import LeaveRoomCommand from './LeaveRoom.command';

@CommandHandler(LeaveRoomCommand)
export default class LeaveRoomHandler implements ICommandHandler<LeaveRoomCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,

    @Inject('IRepository')
    private readonly repository: IRepository,
  ) {}

  async execute({ userId, roomId }: LeaveRoomCommand) {
    const members = await this.repository.getRoomMembers(roomId);

    if (!members) {
      return false;
    }

    // 레포지토리 로직
    await this.repository.removeRoomToUser(userId, roomId);

    // 서버 간 동기화 이벤트
    const socketId = await this.queryBus.execute(new GetSocketIdQuery(userId));
    const syncEvent = new SyncEvent('leave-room', roomId, [socketId]);

    // 시스템 메시지
    const content = `${userId}님이 방을 떠났습니다.`;
    const systemEvent = new EmitEvent('system', roomId, { content });

    this.eventBus.publishAll([syncEvent, systemEvent]);

    return true;
  }
}
