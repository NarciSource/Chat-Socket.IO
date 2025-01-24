import { Message } from "../../model";
import { ResponsePayload, SendPayload } from "../../api/dto";

export const response_dto_to_message = ({ content, senderId }: ResponsePayload): Message => {
  return new Message(senderId, [content]);
};

export const response_dto_to_system_message = ({ content, senderId }: ResponsePayload): Message => {
  return new Message(senderId, [content], true);
};

export const message_to_send_dto = ({
  room_id,
  message,
}: {
  room_id: string;
  message: Message;
}): SendPayload => {
  return {
    roomId: room_id,
    senderId: message.name,
    content: message.text.join("\n"),
  } as SendPayload;
};
