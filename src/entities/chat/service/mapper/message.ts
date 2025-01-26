import { Message, Room, User } from "../../model";
import { ResponsePayload, SendPayload } from "../../api/dto";

export const response_payload_to_message = ({ content, senderId }: ResponsePayload): Message => {
  return new Message(new User(senderId), [content]);
};

export const response_payload_to_system_message = ({
  content,
  senderId,
}: ResponsePayload): Message => {
  return new Message(new User(senderId), [content], true);
};

export const message_to_send_payload = ({
  room,
  message,
}: {
  room: Room;
  message: Message;
}): SendPayload => {
  return {
    roomId: room.id,
    senderId: message.name,
    content: message.text.join("\n"),
  } as SendPayload;
};

export const to_typing_payload = ({ room, user }: { room: Room; user: User }) => ({
  roomId: room.id,
  userId: user.id,
});

export const response_typing_payload = (userId: string) => userId;
