import { SOCKET_EVENT } from "@/shared/socket_constants";
import { response_payload_to_users } from "./user";
import {
  room_created_payload_to_status,
  to_create_room_payload,
  to_leave_room_payload,
} from "./room";
import {
  response_payload_to_message,
  response_payload_to_system_message,
  message_to_send_payload,
  to_typing_payload,
  response_typing_payload,
} from "./message";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Mapper = (data: any) => any;

// 매핑헬퍼서비스 사전
export const on_mappers_dictionary = new Map<string, Mapper>([
  [SOCKET_EVENT.ON_ROOM_CREATED, room_created_payload_to_status],
  [SOCKET_EVENT.ON_MESSAGE, response_payload_to_message],
  [SOCKET_EVENT.ON_SYSTEM, response_payload_to_system_message],
  [SOCKET_EVENT.ON_TYPING, response_typing_payload],
  [SOCKET_EVENT.ON_USERS, response_payload_to_users],
]);
export const emit_mappers_dictionary = new Map<string, Mapper>([
  [SOCKET_EVENT.EMIT_MESSAGE, message_to_send_payload],
  [SOCKET_EVENT.EMIT_CREATE_ROOM, to_create_room_payload],
  [SOCKET_EVENT.EMIT_LEAVE_ROOM, to_leave_room_payload],
  [SOCKET_EVENT.EMIT_INVITE_ROOM, to_leave_room_payload],
  [SOCKET_EVENT.EMIT_TYPING, to_typing_payload],
]);
