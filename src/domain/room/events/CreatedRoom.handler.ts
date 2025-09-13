import { EventsHandler, IEventHandler, EventBus, QueryBus } from '@nestjs/cqrs';

import { EmitEvent, SyncEvent } from 'src/domain/shared/events';
import { GetSocketIdQuery } from '../queries';
import CreatedRoomEvent from './CreatedRoom.event';

@EventsHandler(CreatedRoomEvent)
export default class CreatedRoomHandler implements IEventHandler<CreatedRoomEvent> {
  constructor(
    private queryBus: QueryBus,
    private eventBus: EventBus,
  ) {}

  async handle({ roomId, members }: CreatedRoomEvent) {
    // 서버 간 동기화 이벤트
    const queries = members.map((userId) => new GetSocketIdQuery(userId));
    const socketIds = await Promise.all(queries.map((q) => this.queryBus.execute(q)));
    const syncEvent = new SyncEvent('join-room', roomId, socketIds);

    // 새로운 참가자 알림
    const notifyEvent = new EmitEvent('room_created', roomId, { roomId, participants: members });

    this.eventBus.publishAll([syncEvent, notifyEvent]);
  }
}
