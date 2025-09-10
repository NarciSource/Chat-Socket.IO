import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { IRepository } from 'src/repository';
import CreateRoomCommand from './CreateRoom.command';

@CommandHandler(CreateRoomCommand)
export default class CreateRoomHandler implements ICommandHandler<CreateRoomCommand> {
  constructor(
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

    for (const userId of members) {
      await this.repository.addRoomToUser(userId, roomId);
    }

    return { roomId, participants: members };
  }
}
