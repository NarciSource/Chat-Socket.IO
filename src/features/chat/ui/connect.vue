<template>
  <slot />

  <q-inner-loading :showing="!connecting" label="채팅 연결 대기 중..." />
</template>

<script setup lang="ts">
import { watchEffect } from "vue";
import { storeToRefs } from "pinia";

import { useChatStore } from "../store/chat";
import { setup_socket_listeners } from "@/entities/service/socketService";

const { insert_message } = useChatStore();
const { connecting } = storeToRefs(useChatStore());

watchEffect(() => {
  if (!!connecting.value) {
    // 소켓 이벤트 리스너 설정
    setup_socket_listeners(
      () => (connecting.value = true), // 연결 성공
      () => (connecting.value = false), // 연결 종료
      (message) => insert_message(message), // 일반 메시지 처리
      (system_message) => insert_message(system_message), // 시스템 메시지 처리
    );
  }
});
</script>
