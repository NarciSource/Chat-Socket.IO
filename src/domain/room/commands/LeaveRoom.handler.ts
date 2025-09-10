import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { IRepository } from 'src/repository';
import LeaveRoomCommand from './LeaveRoom.command';

@CommandHandler(LeaveRoomCommand)
export default class LeaveRoomHandler implements ICommandHandler<LeaveRoomCommand> {
  constructor(
    @Inject('IRepository')
    private readonly repository: IRepository,
  ) {}

  async execute({ userId, roomId }: LeaveRoomCommand) {
    const members = await this.repository.getRoomMembers(roomId);

    if (!members) {
      return false;
    }

    await this.repository.removeRoomToUser(userId, roomId);

    return true;
  }
}
