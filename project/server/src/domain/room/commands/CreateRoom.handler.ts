import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';

import { IRepository } from 'src/repository';
import { CreatedRoomEvent } from '../events';
import CreateRoomCommand from './CreateRoom.command';

@CommandHandler(CreateRoomCommand)
export default class CreateRoomHandler implements ICommandHandler<CreateRoomCommand> {
  constructor(
    private readonly eventBus: EventBus,

    @Inject('IRepository')
    private readonly repository: IRepository,
  ) {}

  // 랜덤 roomId
  generateRandomRoomId(): string {
    return Math.random().toString(36).substring(2, 8);
  }

  async execute({ hostId, participants }: CreateRoomCommand) {
    const roomId = this.generateRandomRoomId();
    const members = [...participants, hostId];

    // 레포지토리 로직
    for (const userId of members) {
      await this.repository.addRoomToUser(userId, roomId);
    }

    // 이벤트 발행
    this.eventBus.publish(new CreatedRoomEvent(roomId, members));

    return true;
  }
}
