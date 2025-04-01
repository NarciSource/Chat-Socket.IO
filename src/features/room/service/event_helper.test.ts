import { describe, it, vi, expect } from "vitest";
import { make_room, leave_room, room_created } from "./event_helper";
import { SOCKET_EVENT } from "@/shared/socket_constants";
import { emit_event, subscribe_on } from "@/entities/chat/service/socketService";
import { User, Room } from "@/entities/chat/model";

vi.mock("@/entities/chat/service/socketService", () => ({
  emit_event: vi.fn(),
  subscribe_on: vi.fn(),
}));

describe("room/event_helper", () => {
  describe("make_room", () => {
    it("호스트와 선택된 사용자들로 이벤트를 전송", () => {
      const host: User = { id: "host1", name: "Host User" };
      const selected_users: User[] = [
        { id: "user1", name: "User 1" },
        { id: "user2", name: "User 2" },
      ];

      make_room(host, selected_users);

      expect(emit_event).toHaveBeenCalledWith(SOCKET_EVENT.EMIT_CREATE_ROOM, {
        host,
        selected_users,
      });
    });
  });

  describe("leave_room", () => {
    it("사용자와 방 정보를 포함한 이벤트를 전송", () => {
      const user: User = { id: "user1", name: "User 1" };
      const room: Room = {
        id: "room1",
        name: "Room 1",
        participants: [],
        is_new: true,
      };

      leave_room(user, room);

      expect(emit_event).toHaveBeenCalledWith(SOCKET_EVENT.EMIT_LEAVE_ROOM, {
        user,
        room,
      });
    });
  });

  describe("room_created", () => {
    it("제공된 콜백과 함께 이벤트를 구독", () => {
      const callback = vi.fn();

      room_created(callback);

      expect(subscribe_on).toHaveBeenCalledWith(SOCKET_EVENT.ON_ROOM_CREATED, callback);
    });
  });
});
