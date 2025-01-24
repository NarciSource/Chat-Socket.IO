<template>
  <slot />

  <q-inner-loading :showing="!connecting" label="채팅 연결 대기 중..." />
</template>

<script setup lang="ts">
import { watchEffect } from "vue";
import { storeToRefs } from "pinia";

import { SOCKET_EVENT } from "@/shared/socket_event_names";
import { subscribe_on } from "@/entities/chat/service/socketService";
import { useChatStore } from "../store/chat";

const { insert_message } = useChatStore();
const { connecting } = storeToRefs(useChatStore());

watchEffect(() => {
  if (!!connecting.value) {
    // 소켓 이벤트 리스너 등록
    subscribe_on("connect", () => (connecting.value = true)); // 연결 성공
    subscribe_on("connect_error", () => (connecting.value = false)); // 연결 오류류
    subscribe_on("disconnect", () => (connecting.value = false)); // 연결 종료
    subscribe_on(SOCKET_EVENT.ON_MESSAGE, (message) => insert_message(message)); // 일반 메시지 처리
    subscribe_on(SOCKET_EVENT.ON_SYSTEM, (system_message) => insert_message(system_message)); // 시스템 메시지 처리
  }
});

</script>
