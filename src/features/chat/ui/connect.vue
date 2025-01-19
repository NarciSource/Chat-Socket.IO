<template>
  <slot />

  <q-inner-loading :showing="!connecting" label="채팅 서버 연결 중..." />
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useChatStore } from "../store/chat";
import { setup_socket_listeners } from "../service/socketService";

const { insert_message } = useChatStore();
const { connecting } = storeToRefs(useChatStore());

// 소켓 이벤트 리스너 설정
setup_socket_listeners(
  () => (connecting.value = true), // 연결 성공
  () => (connecting.value = false), // 연결 종료
  (message) => insert_message(message), // 일반 메시지 처리
  (system_message) => insert_message(system_message), // 시스템 메시지 처리
);
</script>
