<template>
  <q-input class="w-200" v-model="message_input" label="메시지 입력" @keyup.enter="send" />
  <q-btn class="q-mt-md float-right" color="yellow" text-color="black" label="전송" @click="send" />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

import { useChatStore } from "../store/chat";
import { setup_socket_listeners, send_message } from "../service/socketService";
import Message from "@/entities/Message";

// 반응형 변수
const message_input = ref("");
const { messages } = useChatStore();

// 메시지 관리 삽입 함수
const insert_message = (message: Message) => {
  const last_index = messages.length - 1;

  if (messages[last_index]?.sent === message.sent && !message.is_system) {
    messages[last_index].add_text(message.text[0]);
  } else {
    messages.push(message);
  }
};

// 메시지 전송 함수
const send = () => {
  const message = new Message([message_input.value], true);

  // 메시지 기록
  insert_message(message);
  // 메시지 전송
  send_message(message);

  // 입력폼 초기화
  message_input.value = "";
};

// 소켓 이벤트 리스너 설정
onMounted(() => {
  setup_socket_listeners(
    (message) => insert_message(message), // 일반 메시지 처리
    (system_message) => insert_message(system_message), // 시스템 메시지 처리
  );
});
</script>
