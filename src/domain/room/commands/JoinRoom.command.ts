import { Command } from '@nestjs/cqrs';

export default class JoinRoomCommand extends Command<{
  success: boolean;
  participants?: string[];
}> {
  constructor(
    public readonly userId: string,
    public readonly roomId: string,
  ) {
    super();
  }
}
