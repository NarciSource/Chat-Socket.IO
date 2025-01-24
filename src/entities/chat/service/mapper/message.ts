import { Message } from "../../model";
import { ResponsePayload, SendPayload } from "../../api/dto";

export const response_dto_to_message = (
  { content, senderId }: ResponsePayload,
  is_system?: boolean,
): Message => {
  return new Message(senderId, [content], is_system);
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
