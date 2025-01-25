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

import { Room } from "@/entities/chat/model";
import useChatStore from "./store/useChatStore";
import { Actions, Content, Layout, Search, Submit, Title } from "./ui";

const store = useChatStore();
const { connecting, room, my_nick } = defineProps({
  connecting: Boolean,
  room: Room,
  my_nick: String,
});

// store에 props를 업데이트
watch(
  () => ({ connecting, room, my_nick }),
  (props) => {
    store.connecting = props.connecting;
    store.room = props.room;
    store.my_nick = props.my_nick!;
  },
  { immediate: true, deep: true },
);
</script>
