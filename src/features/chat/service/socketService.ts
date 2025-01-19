import { io, Socket } from "socket.io-client";

import { ResponseDTO, SendDTO } from "../api/dto";
import { message_to_send_dto, response_dto_to_message } from "./mapper";
import Message from "@/entities/Message";

// 환경 변수
const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_SERVER_URL;
const SOCKET_EVENT_SYSTEM = import.meta.env.VITE_SOCKET_EVENT_SYSTEM;
const SOCKET_EVENT_MESSAGE = import.meta.env.VITE_SOCKET_EVENT_MESSAGE;
const SOCKET_EVENT_RESPONSE = import.meta.env.VITE_SOCKET_EVENT_RESPONSE;
const ID_TOKEN = import.meta.env.VITE_ID_TOKEN;

// 소켓 초기화
const socket: Socket = io(SOCKET_SERVER_URL, {
  transports: ["websocket"],
  auth: {
    idToken: ID_TOKEN,
  },
});

// 메시지 관리용 콜백 타입 정의
type MessageHandler = (message: Message) => void;

// 이벤트 리스너 등록
export const setup_socket_listeners = (
  on_message: MessageHandler,
  on_system_message: MessageHandler,
) => {
  socket.on(SOCKET_EVENT_RESPONSE, (response: ResponseDTO) => {
    const message = response_dto_to_message(response);
    on_message(message);
  });

  socket.on(SOCKET_EVENT_SYSTEM, (response: ResponseDTO) => {
    const message = response_dto_to_message(response, true);
    on_system_message(message);
  });
};

// 메시지 전송
export const send_message = (message: Message) => {
  const dto: SendDTO = message_to_send_dto(message);

  socket.emit(SOCKET_EVENT_MESSAGE, dto);
};
