import Message from "@/entities/chat/model/Message";
import { CreateRoomPayload, LeaveRoomPayload, ResponseDTO, SendDTO } from "../api/dto";

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

export const to_leave_room_payload = (user_id: string, room_id: string): LeaveRoomPayload => {
  return { userId: user_id, roomId: room_id };
};
