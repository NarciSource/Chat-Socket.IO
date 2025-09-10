import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { IRepository } from 'src/repository';
import RegisterUserCommand from './RegisterUser.command';

@CommandHandler(RegisterUserCommand)
export default class RegisterUserHandler implements ICommandHandler<RegisterUserCommand> {
  constructor(
    @Inject('IRepository')
    private readonly repository: IRepository,
  ) {}

  async execute({ payload: { userId, socketId } }: RegisterUserCommand) {
    const has = await this.repository.hasUserSocket(userId);

    if (has) {
      return false; // 중복
    }

    await this.repository.setUserSocket(userId, socketId);

    return true;
  }
}
