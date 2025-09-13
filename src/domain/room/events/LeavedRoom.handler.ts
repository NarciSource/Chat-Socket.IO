import { EventsHandler, IEventHandler, EventBus, QueryBus } from '@nestjs/cqrs';

import { EmitEvent, SyncEvent } from 'src/domain/shared/events';
import { GetSocketIdQuery } from '../queries';
import LeavedRoomEvent from './LeavedRoom.event';

@EventsHandler(LeavedRoomEvent)
export default class LeavedRoomHandler implements IEventHandler<LeavedRoomEvent> {
  constructor(
    private queryBus: QueryBus,
    private eventBus: EventBus,
  ) {}

  async handle({ roomId, userId, members }: LeavedRoomEvent) {
    const success = !!members;

    // 서버 간 동기화 이벤트
    const socketId = await this.queryBus.execute(new GetSocketIdQuery(userId));
    const syncEvent = new SyncEvent('leave-room', roomId, [socketId]);

    // 시스템 메시지
    const content = `${userId}님이 방을 떠났습니다.`;
    const systemEvent = new EmitEvent('system', roomId, { content });

    // 참가자 갱신
    const notifyEvent = new EmitEvent('room_created', roomId, { roomId, participants: members });

    this.eventBus.publishAll(success ? [syncEvent, systemEvent, notifyEvent] : []);
  }
}
