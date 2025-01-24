import { SOCKET_EVENT } from "@/shared/socket_event_names";
import Message from "../model/Message";
import Status from "../model/Status";
import {
  CreateRoomPayload,
  LeaveRoomPayload,
  ResponseDTO,
  RoomCreatedPayload,
  SendDTO,
} from "../api/dto";

export const response_dto_to_message = (dto: ResponseDTO, is_system?: boolean): Message => {
  const { content, senderId } = dto;
  return new Message(senderId, [content], is_system);
};

export const message_to_send_dto = ({
  room_id,
  message,
}: {
  room_id: string;
  message: Message;
}): SendDTO => {
  return {
    roomId: room_id,
    senderId: message.name,
    content: message.text.join("\n"),
  } as SendDTO;
};

export const to_create_room_payload = ({
  host_id,
  selected_users,
}: {
  host_id: string;
  selected_users: string[];
}): CreateRoomPayload => {
  return { hostId: host_id, participants: selected_users };
};

export const room_created_payload_to_status = ({
  roomId,
  participants,
}: RoomCreatedPayload): Status => {
  return new Status(roomId, participants);
};

export const to_leave_room_payload = ({
  user_id,
  room_id,
}: {
  user_id: string;
  room_id: string;
}): LeaveRoomPayload => {
  return { userId: user_id, roomId: room_id };
};

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
