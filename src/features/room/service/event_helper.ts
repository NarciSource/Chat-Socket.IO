import { emit_event, subscribe_on } from "@/entities/chat/service/socketService";
import { SOCKET_EVENT } from "@/shared/socket_event_names";

type Callback = (data: any) => void;

// 다대다 채팅방 생성
export const make_room = (host_id: string, selected_users: string[]) =>
  emit_event(SOCKET_EVENT.EMIT_CREATE_ROOM, { host_id, selected_users });

// 다대다 채팅방 퇴장
export const leave_room = (user_id: string, room_id: string) =>
  emit_event(SOCKET_EVENT.EMIT_LEAVE_ROOM, { user_id, room_id });

// 채팅방 생성 후
export const room_created = (callback: Callback) =>
  subscribe_on(SOCKET_EVENT.ON_ROOM_CREATED, callback);
