import { ResponseDTO, RoomHandshake, SendDTO } from "../api/dto";
import Message from "@/entities/chat/model/Message";

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

export const id_to_room_handshake_dto = (myId: string, otherId: string): RoomHandshake => {
  return { myId, otherId } as RoomHandshake;
};
