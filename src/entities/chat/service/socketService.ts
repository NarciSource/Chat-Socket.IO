/* eslint-disable @typescript-eslint/no-explicit-any */
import { io, Socket } from "socket.io-client";

import { accessToken } from "@/shared/lib/tokens";
import { SOCKET_EVENT, SOCKET_SERVER_URL } from "@/shared/socket_constants";
import { emit_mappers_dictionary, on_mappers_dictionary } from "./mapper/dictionary";

let socket: Socket;
// 소켓 초기화
export function connect() {
  socket = io(SOCKET_SERVER_URL, {
    transports: ["websocket"],
    path: "/chat/ws",
    auth: {
      accessToken,
    },
  });

  // 서버에 클라이언트 등록
  const register = (id: string) => {
    socket.emit(SOCKET_EVENT.EMIT_REGISTER, { userId: id });
  };

  const success = (callback: () => void) => {
    socket.on("connect", callback);
  };

  return { register, success };
}

// 소켓 연결 해제
export function disconnect() {
  socket?.disconnect();
}

// 동적 이벤트 리스너 등록
export const subscribe_on = (event: string, callback: (data: any) => void) =>
  socket.on(event, (data: any) => {
    const mapper = on_mappers_dictionary.get(event);
    callback(mapper?.(data) ?? data);
  });

// 동적 이벤트 이미터 등록
export const emit_event = (event: string, data: any) => {
  const mapper = emit_mappers_dictionary.get(event);
  socket.emit(event, mapper?.(data) ?? data);
};
