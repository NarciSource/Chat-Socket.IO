import { Command } from '@nestjs/cqrs';

export default class JoinRoomCommand extends Command<boolean> {
  constructor(
    public readonly userId: string,
    public readonly roomId: string,
  ) {
    super();
  }
}
