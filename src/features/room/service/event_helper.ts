/* eslint-disable @typescript-eslint/no-explicit-any */
import { Room, User } from "@/entities/chat/model";
import { emit_event, subscribe_on } from "@/entities/chat/service/socketService";
import { SOCKET_EVENT } from "@/shared/socket_constants";

type Callback = (data: any) => void;

// 다대다 채팅방 생성
export const make_room = (host: User, selected_users: User[]) =>
  emit_event(SOCKET_EVENT.EMIT_CREATE_ROOM, { host, selected_users });

// 다대다 채팅방 퇴장
export const leave_room = (user: User, room: Room) =>
  emit_event(SOCKET_EVENT.EMIT_LEAVE_ROOM, { user, room });

// 채팅방 생성 후
export const room_created = (callback: Callback) =>
  subscribe_on(SOCKET_EVENT.ON_ROOM_CREATED, callback);
