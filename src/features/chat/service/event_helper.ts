import { SOCKET_EVENT } from "@/shared/socket_constants";
import { Message, Room, User } from "@/entities/chat/model";
import { emit_event, subscribe_on } from "@/entities/chat/service/socketService";

type Callback = (data: any) => void;

export const send_message = (room: Room, message: Message) =>
  emit_event(SOCKET_EVENT.EMIT_MESSAGE, { room, message });

export const invite_user = (room: Room, user: User) =>
  emit_event(SOCKET_EVENT.EMIT_INVITE_ROOM, { room, user });

export const connected = (callback: Callback) => subscribe_on("connect", callback);

export const connect_failed = (callback: Callback) => subscribe_on("connect_error", callback);

export const disconnected = (callback: Callback) => subscribe_on("disconnect", callback);

export const message_received = (callback: Callback) =>
  subscribe_on(SOCKET_EVENT.ON_MESSAGE, callback);

export const system_message_received = (callback: Callback) =>
  subscribe_on(SOCKET_EVENT.ON_SYSTEM, callback);

export const typing_message = (room: Room, user: User) =>
  emit_event(SOCKET_EVENT.EMIT_TYPING, { room, user });

export const handle_typing_message = (callback: Callback) =>
  subscribe_on(SOCKET_EVENT.ON_TYPING, callback);
