import { Command } from '@nestjs/cqrs';

export default class RegisterUserCommand extends Command<boolean> {
  constructor(public readonly payload: { userId: string; socketId: string }) {
    super();
  }
}
