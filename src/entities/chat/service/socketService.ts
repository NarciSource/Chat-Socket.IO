import { io, Socket } from "socket.io-client";

import { accessToken } from "@/shared/tokens";
import Message from "@/entities/chat/model/Message";
import { ResponseDTO, SendDTO } from "@/features/chat/api/dto";
import { message_to_send_dto, response_dto_to_message } from "@/features/chat/service/mapper";

// 환경 변수
const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_SERVER_URL;
const SOCKET_ON_SYSTEM = import.meta.env.VITE_SOCKET_ON_SYSTEM;
const SOCKET_ON_RESPONSE = import.meta.env.VITE_SOCKET_ON_RESPONSE;
const SOCKET_EMIT_REGISTER = import.meta.env.VITE_SOCKET_EMIT_REGISTER;
const SOCKET_EMIT_MESSAGE = import.meta.env.VITE_SOCKET_EMIT_MESSAGE;

let socket: Socket;
// 소켓 초기화
export function connect() {
  socket = io(SOCKET_SERVER_URL, {
    transports: ["websocket"],
    auth: {
      accessToken,
    },
  });

  // 서버에 클라이언트 등록
  const register = (id: string) => {
    socket.emit(SOCKET_EMIT_REGISTER, { userId: id });
  };

  const success = (callback: () => void) => {
    socket.on("connect", callback);
  };

  return { register, success };
}

export function disconnect() {
  socket?.disconnect();
}

// 메시지 관리용 콜백 타입 정의
type MessageHandler = (message: Message) => void;

// 이벤트 리스너 등록
export const setup_socket_listeners = (
  on_connect: () => void,
  on_disconnect: () => void,
  on_message: MessageHandler,
  on_system_message: MessageHandler,
) => {
  socket.on("connect", on_connect);
  socket.on("connect_error", on_disconnect);
  socket.on("disconnect", on_disconnect);

  socket.on(SOCKET_ON_RESPONSE, (response: ResponseDTO) => {
    const message = response_dto_to_message(response);
    on_message(message);
  });

  socket.on(SOCKET_ON_SYSTEM, (response: ResponseDTO) => {
    const message = response_dto_to_message(response, true);
    on_system_message(message);
  });
};

// 메시지 전송
export const send_message = (recipient: string, message: Message) => {
  const dto: SendDTO = message_to_send_dto(recipient, message);

  socket.emit(SOCKET_EMIT_MESSAGE, dto);
};
