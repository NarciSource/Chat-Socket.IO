import { Command } from '@nestjs/cqrs';

export default class DisconnectUserCommand extends Command<boolean> {
  constructor(public readonly socketId: string) {
    super();
  }
}
