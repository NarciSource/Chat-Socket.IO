<template>
  <q-input class="w-200" v-model="send_message" label="메시지 입력" @keyup.enter="send" />
  <q-btn class="q-mt-md float-right" color="yellow" text-color="black" label="전송" @click="send" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { io, Socket } from "socket.io-client";

import { useChatStore } from "../store/chat";
import { ResponseDTO, SendDTO } from "../api/dto";
import { response_dto_to_message, message_to_send_dto } from "../service/mapper";
import Message from "@/entities/Message";

const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_SERVER_URL;
const SOCKET_EVENT_SYSTEM = import.meta.env.VITE_SOCKET_EVENT_SYSTEM;
const SOCKET_EVENT_MESSAGE = import.meta.env.VITE_SOCKET_EVENT_MESSAGE;
const SOCKET_EVENT_RESPONSE = import.meta.env.VITE_SOCKET_EVENT_RESPONSE;
const ID_TOKEN = import.meta.env.VITE_ID_TOKEN;

// 반응형 변수
const { messages } = useChatStore();
const send_message = ref("");

// 메시지 관리 삽입 함수
const insert_message = (message: Message) => {
  const last_index = messages.length - 1;

  if (messages[last_index]?.sent === message.sent && !message.is_system) {
    messages[last_index].add_text(message.text[0]);
  } else {
    messages.push(message);
  }
};

// 소켓 통신
const socket: Socket = io(SOCKET_SERVER_URL, {
  transports: ["websocket"],
  auth: {
    idToken: ID_TOKEN,
  },
});
// 소켓 이벤트 리스너
socket.on(SOCKET_EVENT_RESPONSE, (response: ResponseDTO) => {
  const message = response_dto_to_message(response);
  insert_message(message);
});
// 시스템 메시지 이벤트 리스너
socket.on(SOCKET_EVENT_SYSTEM, (response: ResponseDTO) => {
  const message = response_dto_to_message(response, true);
  insert_message(message);
});
// 메시지 전송 함수
const send = () => {
  const message = new Message([send_message.value], true);
  const dto: SendDTO = message_to_send_dto(message);

  // 메시지 기록
  insert_message(message);
  // 메시지 전송
  socket.emit(SOCKET_EVENT_MESSAGE, dto);

  // 입력폼 초기화
  send_message.value = "";
};
</script>
