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
import { watch } from "vue";
import { watchEffect } from "vue";

import { Room, User } from "@/entities/chat/model";
import {
  connected,
  connect_failed,
  disconnected,
  message_received,
  system_message_received,
  handle_typing_message,
} from "../service/event_helper";
import useChatStore from "../store/useChatStore";

const { connecting, room, current_user } = defineProps({
  connecting: Boolean,
  room: Room,
  current_user: User,
});
const { insert_message, alarm_typing } = useChatStore();
const store = useChatStore();

// store에 props를 업데이트
watch(
  () => ({ connecting, room, current_user }),
  (props) => {
    store.connecting = props.connecting;
    store.room = props.room;
    store.current_user = props.current_user!;
  },
  { immediate: true, deep: true },
);

watchEffect(() => {
  if (!!store.connecting) {
    // 소켓 이벤트 리스너 등록
    connected(() => (store.connecting = true)); // 연결 성공
    connect_failed(() => (store.connecting = false)); // 연결 실패
    disconnected(() => (store.connecting = false)); // 연결 종료
    message_received(insert_message); // 일반 메시지 수신
    system_message_received(insert_message); // 시스템 메시지 수신
    handle_typing_message(alarm_typing); // 타이핑 알림
  }
});
</script>
