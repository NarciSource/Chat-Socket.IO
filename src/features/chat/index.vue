<template>
  <layout>
    <template #header> <search /> <Title /> </template>

    <template #toolbar> <actions /> </template>

    <template #content>
      <connect>
        <content />
      </connect>
    </template>

    <template #footer> <submit /> </template>
  </layout>
</template>

<script setup lang="ts">
import { watch } from "vue";

import { Room, User } from "@/entities/chat/model";
import useChatStore from "./store/useChatStore";
import { Layout, Search, Title, Actions, Connect, Content, Submit } from "./ui";

const { connecting, room, current_user } = defineProps({
  connecting: Boolean,
  room: Room,
  current_user: User,
});

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
</script>
