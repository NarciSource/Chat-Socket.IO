import { EventsHandler, IEventHandler, EventBus, QueryBus } from '@nestjs/cqrs';

import { EmitEvent, SyncEvent } from 'src/domain/shared/events';
import { GetMessageHistoryQuery, GetSocketIdQuery } from '../queries';
import JoinedRoomEvent from './JoinedRoom.event';

@EventsHandler(JoinedRoomEvent)
export default class JoinedRoomHandler implements IEventHandler<JoinedRoomEvent> {
  constructor(
    private queryBus: QueryBus,
    private eventBus: EventBus,
  ) {}

  async handle({ roomId, userId, members }: JoinedRoomEvent) {
    const success = !!members;

    // 서버 간 동기화 이벤트
    const socketId = await this.queryBus.execute(new GetSocketIdQuery(userId));
    const syncEvent = new SyncEvent('join-room', roomId, [socketId]);

    // 시스템 메시지
    const successContent = `${userId}님이 방에 참여했습니다.`;
    const successSystemEvent = new EmitEvent('system', roomId, { roomId, content: successContent });
    const failureContent = `존재하지 않는 방입니다.`;
    const failureSystemEvent = new EmitEvent('system', roomId, { roomId, content: failureContent });

    // 새로운 참가자 알림
    const notifyEvent = new EmitEvent('room_created', roomId, { roomId, participants: members });

    // 방 메시지 기록 읽기
    const history = await this.queryBus.execute(new GetMessageHistoryQuery(roomId));
    const historyEvent = new EmitEvent('receive_messages', roomId, { roomId, messages: history });

    this.eventBus.publishAll(
      success ? [syncEvent, successSystemEvent, notifyEvent, historyEvent] : [failureSystemEvent],
    );
  }
}
