<template>
  <slot />

  <q-inner-loading :showing="!connecting" label="채팅 연결 대기 중..." />
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { watchEffect } from "vue";

import {
  connected,
  connect_failed,
  disconnected,
  message_received,
  system_message_received,
} from "../service/event_helper";
import { useChatStore } from "../store/chat";

const { insert_message } = useChatStore();
const { connecting } = storeToRefs(useChatStore());

watchEffect(() => {
  if (!!connecting.value) {
    // 소켓 이벤트 리스너 등록
    connected(() => (connecting.value = true)); // 연결 성공
    connect_failed(() => (connecting.value = false)); // 연결 실패
    disconnected(() => (connecting.value = false)); // 연결 종료
    message_received(insert_message); // 일반 메시지 수신
    system_message_received(insert_message); // 시스템 메시지 수신
  }
});
</script>
