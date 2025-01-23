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

export const message_to_send_dto = (room_id: string, message: Message): SendDTO => {
  return {
    senderId: message.name,
    recipientId: room_id,
    content: message.text.join("\n"),
  } as SendDTO;
};

export const to_create_room_payload = (
  host_id: string,
  selected_users: string[],
): CreateRoomPayload => {
  return { hostId: host_id, participants: selected_users };
};

export const room_created_payload_to_status = ({
  roomId,
  participants,
}: RoomCreatedPayload): Status => {
  return new Status(roomId, participants);
};

export const to_leave_room_payload = (user_id: string, room_id: string): LeaveRoomPayload => {
  return { userId: user_id, roomId: room_id };
};
