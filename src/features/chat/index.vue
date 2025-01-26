<template>
  <Connect>
    <content />
  </Connect>
</template>

<script setup lang="ts">
import { watch } from "vue";

import { Room, User } from "@/entities/chat/model";
import useChatStore from "./store/useChatStore";
import { Connect, Content } from "./ui";

const store = useChatStore();
const { connecting, room, current_user } = defineProps({
  connecting: Boolean,
  room: Room,
  current_user: User,
});

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
</script>
