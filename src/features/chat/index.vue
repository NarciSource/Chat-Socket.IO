<template>
  <layout>
    <template #header><search /><Title /></template>
    <template #content><content /></template>
    <template #side><actions /></template>
    <template #footer><submit /></template>
  </layout>
</template>

<script setup lang="ts">
import { watch } from "vue";

import { Room, User } from "@/entities/chat/model";
import useChatStore from "./store/useChatStore";
import { Actions, Content, Layout, Search, Submit, Title } from "./ui";

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
