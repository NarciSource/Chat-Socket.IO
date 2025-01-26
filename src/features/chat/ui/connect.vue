<template>
  <slot />

  <q-inner-loading
    :showing="!connecting"
    class="fit"
    color="teal-9"
    label="채팅 연결 대기 중..."
    label-class="text-overline text-weight-bold text-teal-9"
  />
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
  handle_typing_message,
} from "../service/event_helper";
import useChatStore from "../store/useChatStore";

const { insert_message, alarm_typing } = useChatStore();
const { connecting } = storeToRefs(useChatStore());

watchEffect(() => {
  if (!!connecting.value) {
    // 소켓 이벤트 리스너 등록
    connected(() => (connecting.value = true)); // 연결 성공
    connect_failed(() => (connecting.value = false)); // 연결 실패
    disconnected(() => (connecting.value = false)); // 연결 종료
    message_received(insert_message); // 일반 메시지 수신
    system_message_received(insert_message); // 시스템 메시지 수신
    handle_typing_message(alarm_typing); // 타이핑 알림
  }
});
</script>
