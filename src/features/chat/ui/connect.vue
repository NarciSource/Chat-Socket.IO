<template>
  <slot />

  <q-inner-loading :showing="!connecting" label="채팅 연결 대기 중..." />
</template>

<script setup lang="ts">
import { watchEffect } from "vue";
import { storeToRefs } from "pinia";

import { subscribe } from "@/entities/chat/service/socketService";
import { useChatStore } from "../store/chat";

const SOCKET_ON_MESSAGE = import.meta.env.VITE_SOCKET_ON_MESSAGE;
const SOCKET_ON_SYSTEM = import.meta.env.VITE_SOCKET_ON_SYSTEM;

const { insert_message } = useChatStore();
const { connecting } = storeToRefs(useChatStore());

watchEffect(() => {
  if (!!connecting.value) {
    // 소켓 이벤트 리스너 등록
    subscribe("connect", () => (connecting.value = true)); // 연결 성공
    subscribe("connect_error", () => (connecting.value = false)); // 연결 오류류
    subscribe("disconnect", () => (connecting.value = false)); // 연결 종료
    subscribe(SOCKET_ON_MESSAGE, (message) => insert_message(message)); // 일반 메시지 처리
    subscribe(SOCKET_ON_SYSTEM, (system_message) => insert_message(system_message)); // 시스템 메시지 처리
  }
});

</script>
