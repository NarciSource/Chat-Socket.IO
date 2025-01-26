<template>
  <q-input v-model="message_input" label="메시지 입력" @keyup.enter="send" />
  <q-btn class="q-mt-md float-right" color="yellow" text-color="black" label="전송" @click="send" />
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";

import { Message } from "@/entities/chat/model";
import { send_message, typing_message } from "../service/event_helper";
import useChatStore from "../store/useChatStore";

// 반응형 변수
const message_input = ref("");
const { current_user, room } = storeToRefs(useChatStore());

// 메시지 전송 함수
const send = () => {
  // 메시지 생성
  const message = new Message(current_user.value!, [message_input.value]);

  // 메시지 전송
  send_message(room.value!, message);

  // 입력폼 초기화
  message_input.value = "";
};

// 타이핑 이벤트
watch(message_input, () => {
  typing_message(room.value!, current_user.value!);
});
</script>
