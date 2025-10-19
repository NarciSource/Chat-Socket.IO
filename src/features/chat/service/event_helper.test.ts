import { describe, it, expect, vi } from "vitest";

import { Message, Room, User } from "@/entities/chat/model";
import { emit_event, subscribe_on } from "@/entities/chat/service/socketService";
import { SOCKET_EVENT } from "@/shared/constants";
import {
  send_message,
  connect_failed,
  disconnected,
  message_received,
  system_message_received,
  typing_message,
  handle_typing_message,
  connected,
} from "./event_helper";

vi.mock("@/entities/chat/service/socketService", () => ({
  emit_event: vi.fn(),
  subscribe_on: vi.fn(),
}));

describe("chat/event_helper", () => {
  describe("send_message", () => {
    it("방과 메시지를 포함한 이벤트를 전송", () => {
      const user = new User("user1", "User 1");
      const room = new Room("room1", []);
      const message = new Message(user, ["Hello, world!"]);

      send_message(room, message);

      expect(emit_event).toHaveBeenCalledWith(SOCKET_EVENT.EMIT_MESSAGE, { room, message });
    });
  });

  describe("invite_user", () => {
    it("방과 사용자를 포함한 이벤트를 전송", () => {
      const room = new Room("room1", []);
      const user = new User("user2", "User 2");

      invite_user(room, user);

      expect(emit_event).toHaveBeenCalledWith(SOCKET_EVENT.EMIT_INVITE_ROOM, { room, user });
    });
  });

  describe("connected", () => {
    it("connect 이벤트를 구독", () => {
      const callback = vi.fn();

      connected(callback);

      expect(subscribe_on).toHaveBeenCalledWith("connect", callback);
    });
  });

  describe("connect_failed", () => {
    it("connect_error 이벤트를 구독", () => {
      const callback = vi.fn();

      connect_failed(callback);

      expect(subscribe_on).toHaveBeenCalledWith("connect_error", callback);
    });
  });

  describe("disconnected", () => {
    it("disconnect 이벤트를 구독", () => {
      const callback = vi.fn();

      disconnected(callback);

      expect(subscribe_on).toHaveBeenCalledWith("disconnect", callback);
    });
  });

  describe("message_received", () => {
    it("메시지 수신 이벤트를 구독", () => {
      const callback = vi.fn();

      message_received(callback);

      expect(subscribe_on).toHaveBeenCalledWith(SOCKET_EVENT.ON_MESSAGE, callback);
    });
  });

  describe("system_message_received", () => {
    it("시스템 메시지 수신 이벤트를 구독", () => {
      const callback = vi.fn();

      system_message_received(callback);

      expect(subscribe_on).toHaveBeenCalledWith(SOCKET_EVENT.ON_SYSTEM, callback);
    });
  });

  describe("typing_message", () => {
    it("방과 사용자를 포함한 타이핑 이벤트를 전송", () => {
      const room = new Room("room1", []);
      const user = new User("user1", "User 1");

      typing_message(room, user);

      expect(emit_event).toHaveBeenCalledWith(SOCKET_EVENT.EMIT_TYPING, { room, user });
    });
  });

  describe("handle_typing_message", () => {
    it("타이핑 메시지 이벤트를 구독", () => {
      const callback = vi.fn();

      handle_typing_message(callback);

      expect(subscribe_on).toHaveBeenCalledWith(SOCKET_EVENT.ON_TYPING, callback);
    });
  });
});
