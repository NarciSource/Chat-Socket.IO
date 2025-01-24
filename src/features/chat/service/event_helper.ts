import { SOCKET_EVENT } from "@/shared/socket_event_names";
import Message from "@/entities/chat/model/Message";
import { emit_event, subscribe_on } from "@/entities/chat/service/socketService";

type Callback = (data: any) => void;

export const send_message = (room_id: string, message: Message) =>
  emit_event(SOCKET_EVENT.EMIT_MESSAGE, { room_id, message });

export const connected = (callback: Callback) => subscribe_on("connect", callback);

export const connect_failed = (callback: Callback) => subscribe_on("connect_error", callback);

export const disconnected = (callback: Callback) => subscribe_on("disconnect", callback);

export const message_received = (callback: Callback) =>
  subscribe_on(SOCKET_EVENT.ON_MESSAGE, callback);

export const system_message_received = (callback: Callback) =>
  subscribe_on(SOCKET_EVENT.ON_SYSTEM, callback);
