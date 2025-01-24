import { Status } from "../../model";
import { CreateRoomPayload, LeaveRoomPayload, RoomCreatedPayload } from "../../api/dto";

export const to_create_room_payload = ({
  host_id,
  selected_users,
}: {
  host_id: string;
  selected_users: string[];
}): CreateRoomPayload => {
  return { hostId: host_id, participants: selected_users };
};

export const to_leave_room_payload = ({
  user_id,
  room_id,
}: {
  user_id: string;
  room_id: string;
}): LeaveRoomPayload => {
  return { userId: user_id, roomId: room_id };
};

export const room_created_payload_to_status = ({
  roomId,
  participants,
}: RoomCreatedPayload): Status => {
  return new Status(roomId, participants);
};
