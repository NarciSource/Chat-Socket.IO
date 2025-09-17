import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';

import { IRepository } from 'src/repository';
import { LeavedRoomEvent } from '../events';
import LeaveRoomCommand from './LeaveRoom.command';

@CommandHandler(LeaveRoomCommand)
export default class LeaveRoomHandler implements ICommandHandler<LeaveRoomCommand> {
  constructor(
    private readonly eventBus: EventBus,

    @Inject('IRepository')
    private readonly repository: IRepository,
  ) {}

  async execute({ userId, roomId }: LeaveRoomCommand) {
    // 레포지토리 로직
    await this.repository.removeRoomToUser(userId, roomId);

    const members = await this.repository.getRoomMembers(roomId);

    if (members) {
      // 레포지토리 로직
      await this.repository.addRoomToUser(userId, roomId);
    }

    // 이벤트 발행
    this.eventBus.publish(new LeavedRoomEvent(roomId, userId, members));

    return !!members;
  }
}
