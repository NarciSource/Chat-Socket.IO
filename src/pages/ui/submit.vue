<template>
  <q-input class="w-200" v-model="send_message" label="메시지 입력" @keyup.enter="send" />
  <q-btn class="q-mt-md float-right" color="yellow" text-color="black" label="전송" @click="send" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { io, Socket } from "socket.io-client";

import Message from "@/entities/Message";

const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_SERVER_URL;
const SOCKET_EVENT_MESSAGE = import.meta.env.VITE_SOCKET_EVENT_MESSAGE;
const SOCKET_EVENT_RESPONSE = import.meta.env.VITE_SOCKET_EVENT_RESPONSE;

// 반응형 변수
const messages = defineModel<Message[]>({ required: true });
const send_message = ref();

// 메시지 관리 삽입 함수
const insert_message = (text: string, sent: boolean) => {
  const last_index = messages.value.length - 1;

  if (messages.value[last_index]?.sent === sent) {
    messages.value[last_index].add_text(text);
  } else {
    const new_message = new Message([text], sent);
    messages.value.push(new_message);
  }
};

// 소켓 통신
const socket: Socket = io(SOCKET_SERVER_URL, {
  transports: ["websocket"],
});
// 소켓 이벤트 리스너
socket.on(SOCKET_EVENT_RESPONSE, (response: string) => {
  insert_message(response, false);
});
// 메시지 전송 함수
const send = () => {
  socket.emit(SOCKET_EVENT_MESSAGE, send_message.value);

  insert_message(send_message.value, true);
};
</script>
