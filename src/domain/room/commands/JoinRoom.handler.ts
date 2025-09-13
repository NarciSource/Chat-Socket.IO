import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';

import { IRepository } from 'src/repository';
import { JoinedRoomEvent } from '../events';
import JoinRoomCommand from './JoinRoom.command';

@CommandHandler(JoinRoomCommand)
export default class JoinRoomHandler implements ICommandHandler<JoinRoomCommand> {
  constructor(
    private readonly eventBus: EventBus,

    @Inject('IRepository')
    private readonly repository: IRepository,
  ) {}

  async execute({ userId, roomId }: JoinRoomCommand) {
    const members = await this.repository.getRoomMembers(roomId);

    if (members) {
      // 레포지토리 로직
      await this.repository.addRoomToUser(userId, roomId);
    }

    // 이벤트 발행
    this.eventBus.publish(new JoinedRoomEvent(roomId, userId, members));

    return !!members;
  }
}
