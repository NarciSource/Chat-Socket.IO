import { SOCKET_EVENT } from "@/shared/socket_constants";
import {
  room_created_payload_to_status,
  to_create_room_payload,
  to_leave_room_payload,
} from "./room";
import { response_dto_to_message, message_to_send_dto } from "./message";

type Mapper = (data: any) => any;

// 매핑헬퍼서비스 사전
export const mappers_dictionary = new Map<string, Mapper>([
  [SOCKET_EVENT.ON_ROOM_CREATED, room_created_payload_to_status],
  [SOCKET_EVENT.ON_MESSAGE, response_dto_to_message],
  [SOCKET_EVENT.ON_SYSTEM, response_dto_to_message],
  [SOCKET_EVENT.EMIT_MESSAGE, message_to_send_dto],
  [SOCKET_EVENT.EMIT_CREATE_ROOM, to_create_room_payload],
  [SOCKET_EVENT.EMIT_LEAVE_ROOM, to_leave_room_payload],
]);
