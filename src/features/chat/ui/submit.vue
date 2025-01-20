<template>
  <q-input class="w-200" v-model="message_input" label="메시지 입력" @keyup.enter="send" />
  <q-btn class="q-mt-md float-right" color="yellow" text-color="black" label="전송" @click="send" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";

import { useChatStore } from "../store/chat";
import { send_message } from "@/entities/service/socketService";
import Message from "@/entities/model/Message";
import { useRoomStore } from "@/features/room/store/room";

// 반응형 변수
const message_input = ref("");
const { insert_message } = useChatStore();
const { my_nick, opponent_nick } = storeToRefs(useRoomStore());

// 메시지 전송 함수
const send = () => {
  const message = new Message(my_nick.value, [message_input.value], true);

  // 메시지 기록
  insert_message(message);
  // 메시지 전송
  send_message(opponent_nick.value, message);

  // 입력폼 초기화
  message_input.value = "";
};
</script>
