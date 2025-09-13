import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, QueryBus, EventBus } from '@nestjs/cqrs';

import { IRepository } from 'src/repository';
import { GetSocketIdQuery } from '../queries';
import { EmitEvent, SyncEvent } from '../events';
import CreateRoomCommand from './CreateRoom.command';

@CommandHandler(CreateRoomCommand)
export default class CreateRoomHandler implements ICommandHandler<CreateRoomCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,

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

    // 레포지토리 로직
    for (const userId of members) {
      await this.repository.addRoomToUser(userId, roomId);
    }

    // 서버 간 동기화 이벤트
    const queries = members.map((userId) => new GetSocketIdQuery(userId));
    const socketIds = await Promise.all(queries.map((q) => this.queryBus.execute(q)));
    const syncEvent = new SyncEvent('join-room', roomId, socketIds);

    // 새로운 참가자 알림
    const notifyEvent = new EmitEvent('room_created', roomId, { roomId, participants: members });

    this.eventBus.publishAll([syncEvent, notifyEvent]);

    return true;
  }
}
