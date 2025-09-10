import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { IRepository } from 'src/repository';
import JoinRoomCommand from './JoinRoom.command';

@CommandHandler(JoinRoomCommand)
export default class JoinRoomHandler implements ICommandHandler<JoinRoomCommand> {
  constructor(
    @Inject('IRepository')
    private readonly repository: IRepository,
  ) {}

  async execute({ userId, roomId }: JoinRoomCommand) {
    const members = await this.repository.getRoomMembers(roomId);

    if (!members) {
      return { success: false };
    }

    await this.repository.addRoomToUser(userId, roomId);

    return { success: true, participants: members };
  }
}
