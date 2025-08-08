import { Room, User } from "../../model";
import {
  CreateRoomPayload,
  LeaveRoomPayload,
  InviteRoomPayload,
  RoomCreatedPayload,
} from "../../api/dto";

export const to_create_room_payload = ({
  host,
  selected_users,
}: {
  host: User;
  selected_users: User[];
}): CreateRoomPayload => {
  return { hostId: host.id, participants: selected_users.map((user) => user.id) };
};

export const to_leave_room_payload = ({
  user,
  room,
}: {
  user: User;
  room: Room;
}): LeaveRoomPayload => {
  return { userId: user.id, roomId: room.id };
};

export const to_join_room_payload = ({
  user,
  room,
}: {
  user: User;
  room: Room;
}): InviteRoomPayload => {
  return { userId: user.id, roomId: room.id };
};

export const room_created_payload_to_status = ({
  roomId,
  participants,
}: RoomCreatedPayload): Room => {
  return new Room(
    roomId,
    participants.map((name) => new User(name)),
  );
};
