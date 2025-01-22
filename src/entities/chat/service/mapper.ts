import { ResponseDTO, SendDTO } from "../api/dto";
import Message from "@/entities/chat/model/Message";

export const response_dto_to_message = (dto: ResponseDTO, is_system?: boolean): Message => {
  const { content, senderId } = dto;
  return new Message(senderId, [content], false, is_system);
};

export const message_to_send_dto = (room_id: string, message: Message): SendDTO => {
  return {
    senderId: message.name,
    recipientId: room_id,
    content: message.text.join("\n"),
  } as SendDTO;
};
