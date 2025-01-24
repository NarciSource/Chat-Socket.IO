import { io, Socket } from "socket.io-client";

import { accessToken } from "@/shared/tokens";
import { SOCKET_EVENT, SOCKET_SERVER_URL } from "@/shared/socket_event_names";
import Message from "../model/Message";
import { SendDTO } from "../api/dto";
import {
  response_dto_to_message,
  message_to_send_dto,
  room_created_payload_to_status,
  to_create_room_payload,
  to_leave_room_payload,
} from "./mapper";

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
    socket.emit(SOCKET_EVENT.EMIT_REGISTER, { userId: id });
  };

  const success = (callback: () => void) => {
    socket.on("connect", callback);
  };

  return { register, success };
}

export function disconnect() {
  socket?.disconnect();
}

type Callback = (data: any) => void;
type Mapper = (data: any) => any;

// 매핑헬퍼서비스 사전
const mappers_dictionary = new Map<string, Mapper>([
  [SOCKET_EVENT.ON_ROOM_CREATED, room_created_payload_to_status],
  [SOCKET_EVENT.ON_MESSAGE, response_dto_to_message],
  [SOCKET_EVENT.ON_SYSTEM, response_dto_to_message],
]);

// 동적 이벤트 리스너 등록
export const subscribe = (event: string, callback: Callback) =>
  socket.on(event, (data: any) => {
    const mapper = mappers_dictionary.get(event);
    if (mapper) {
      callback(mapper(data));
    } else {
      callback(data);
    }
  });

// 다대다 채팅방 생성
export const make_room = (id: string, selected_users: string[]) => {
  socket.emit("create_room", to_create_room_payload(id, selected_users));
};

// 일대일 채팅방 퇴장
export const leave_room = (id: string, opponent_id: string) => {
  socket.emit("leave_room", to_leave_room_payload(id, opponent_id));
};

// 메시지 전송
export const send_message = (room_id: string, message: Message) => {
  const dto: SendDTO = message_to_send_dto(room_id, message);

  socket.emit(SOCKET_EVENT.EMIT_MESSAGE, dto);
};
