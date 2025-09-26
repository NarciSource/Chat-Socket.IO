import { Message, Room, User } from "../../model";
import { ResponsePayload, SendPayload } from "../../api/dto";

export const response_payload_to_message = ({
  content,
  userId,
  roomId,
}: ResponsePayload): [Message, string] => {
  return [new Message(new User(userId), [content]), roomId];
};

export const response_payload_to_system_message = ({
  content,
  roomId,
}: ResponsePayload): [Message, string] => {
  return [new Message(new User("system"), [content], true), roomId];
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
    userId: message.name,
    content: message.text.join("\n"),
  } as SendPayload;
};

export const to_typing_payload = ({ room, user }: { room: Room; user: User }) => ({
  roomId: room.id,
  userId: user.id,
});

export const response_typing_payload = (userId: string) => userId;

export const response_payload_to_messages = ({
  roomId,
  messages,
}: {
  roomId: string;
  messages: { userId: string; content: string; createdAt: string }[];
}) => ({
  roomId,
  incoming_messages: messages.map(
    ({ userId, content, createdAt }) =>
      new Message(new User(userId), [content], false, new Date(createdAt)),
  ),
});
