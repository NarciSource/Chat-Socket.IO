import { ResponseDTO, SendDTO } from "../api/dto";
import Message from "@/entities/Message";

export const response_dto_to_message = (dto: ResponseDTO, is_system?: boolean): Message => {
  const text = dto.content;
  return new Message("testuser", [text], false, is_system);
};

export const message_to_send_dto = (message: Message): SendDTO => {
  return {
    senderId: "testuser",
    recipientId: "testuser",
    content: message.text.join("\n"),
  };
};
