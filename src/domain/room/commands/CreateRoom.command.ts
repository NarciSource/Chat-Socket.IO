import { Command } from '@nestjs/cqrs';

export default class CreateRoomCommand extends Command<boolean> {
  constructor(
    public readonly hostId: string,
    public readonly participants: string[],
  ) {
    super();
  }
}
