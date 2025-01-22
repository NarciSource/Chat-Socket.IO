<template>
  <q-input class="w-200" v-model="message_input" label="메시지 입력" @keyup.enter="send" />
  <q-btn class="q-mt-md float-right" color="yellow" text-color="black" label="전송" @click="send" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";

import Message from "@/entities/chat/model/Message";
import { send_message } from "@/entities/chat/service/socketService";
import { useChatStore } from "../store/chat";

// 반응형 변수
const message_input = ref("");
const { my_nick, room_id } = storeToRefs(useChatStore());

// 메시지 전송 함수
const send = () => {
  // 메시지 생성
  const message = new Message(my_nick.value, [message_input.value]);

  // 메시지 전송
  send_message(room_id.value, message);

  // 입력폼 초기화
  message_input.value = "";
};
</script>
