import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { IRepository } from 'src/repository';
import DisconnectUserCommand from './DisconnectUser.command';

@CommandHandler(DisconnectUserCommand)
export default class DisconnectUserHandler implements ICommandHandler<DisconnectUserCommand> {
  constructor(
    @Inject('IRepository')
    private readonly repository: IRepository,
  ) {}

  async execute({ socketId }: DisconnectUserCommand) {
    const userId = await this.repository.findUserIdBySocketId(socketId);

    if (!userId) return false;

    // socket map 제거
    await this.repository.removeUserSocket(userId);

    return true;
  }
}
