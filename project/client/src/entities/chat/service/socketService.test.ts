import { describe, it, beforeEach, afterEach, vi, expect } from "vitest";
import { io, Socket } from "socket.io-client";

import { SOCKET_EVENT, SOCKET_SERVER_URL } from "@/shared/socket_constants";
import { emit_mappers_dictionary, on_mappers_dictionary } from "./mapper/dictionary";
import { connect, disconnect, subscribe_on, emit_event } from "./socketService";

// 모듈 모킹
vi.mock("socket.io-client");
vi.mock("@/shared/lib/tokens", () => ({
  accessToken: "mockedAccessToken",
}));

describe("socketService", () => {
  const mockedIo = vi.mocked(io, true);
  let mockSocket: Socket;

  beforeEach(() => {
    mockSocket = {
      emit: vi.fn(),
      on: vi.fn(),
      disconnect: vi.fn(),
    } as unknown as Socket;

    mockedIo.mockReturnValue(mockSocket);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("connect", () => {
    it("소켓 연결을 올바른 옵션으로 초기화", () => {
      const { register, success } = connect();

      expect(io).toHaveBeenCalledWith(SOCKET_SERVER_URL, {
        transports: ["websocket"],
        path: "/chat/ws",
        auth: { accessToken: expect.any(String) },
      });
      expect(typeof register).toBe("function");
      expect(typeof success).toBe("function");
    });

    it("사용자를 등록 이벤트로 등록", () => {
      const { register } = connect();
      const userId = "123";

      register(userId);

      expect(mockSocket.emit).toHaveBeenCalledWith(SOCKET_EVENT.EMIT_REGISTER, { userId });
    });

    it("소켓 연결 시 성공 콜백을 호출", () => {
      const { success } = connect();
      const callback = vi.fn();

      success(callback);

      expect(mockSocket.on).toHaveBeenCalledWith("connect", callback);
    });
  });

  describe("disconnect", () => {
    it("소켓이 존재하면 연결을 해제", () => {
      connect();
      disconnect();

      expect(mockSocket.disconnect).toHaveBeenCalled();
    });
  });

  describe("subscribe_on", () => {
    beforeEach(() => {
      on_mappers_dictionary.set(
        "test_event_exist",
        vi.fn((value) => "mapped_" + value),
      );
    });

    it("이벤트 리스너를 등록하고 매퍼가 존재하면 매퍼를 적용", () => {
      const event = "test_event_exist";
      const callback = vi.fn();
      const mockData = "value";

      connect();
      subscribe_on(event, callback);

      const onCallback = (mockSocket.on as ReturnType<typeof vi.fn>).mock.calls[0][1]; //함수가 호출된 첫번째 기록의 두번째 인자(콜백 함수)
      onCallback(mockData);

      expect(callback).toHaveBeenCalledWith("mapped_" + mockData);
      expect(callback).not.toHaveBeenCalledWith(mockData);
    });

    it("매퍼가 존재하지 않을 경우 데이터를 그대로 콜백에 전달", () => {
      const event = "test_event_not_exist";
      const callback = vi.fn();
      const mockData = "value";

      connect();
      subscribe_on(event, callback);

      const onCallback = (mockSocket.on as ReturnType<typeof vi.fn>).mock.calls[0][1];
      onCallback(mockData);

      expect(callback).not.toHaveBeenCalledWith("mapped_" + mockData);
      expect(callback).toHaveBeenCalledWith(mockData);
    });
  });

  describe("emit_event", () => {
    beforeEach(() => {
      emit_mappers_dictionary.set(
        "test_event_exist",
        vi.fn((value) => "mapped_" + value),
      );
    });

    it("매퍼가 존재할 경우 매핑된 데이터를 사용하여 이벤트 발생", () => {
      const event = "test_event_exist";
      const data = "value";

      connect();
      emit_event(event, data);

      expect(mockSocket.emit).toHaveBeenCalledWith(event, "mapped_" + data);
      expect(mockSocket.emit).not.toHaveBeenCalledWith(event, data);
    });

    it("매퍼가 존재하지 않을 경우 데이터를 그대로 이벤트 발생", () => {
      const event = "test_event_not_exist";
      const data = "value";

      connect();
      emit_event(event, data);

      expect(mockSocket.emit).not.toHaveBeenCalledWith(event, "mapped_" + data);
      expect(mockSocket.emit).toHaveBeenCalledWith(event, data);
    });
  });
});
