<template>
  <layout>
    <template #header> </template>

    <template #content> </template>
  </layout>
</template>

<script setup lang="ts">
import { watch } from "vue";

import { Room, User } from "@/entities/chat/model";
import useExplorerStore from "./store/useExplorerStore";
import { Layout } from "./ui";

const { connecting, current_user, rooms, selected_room } = defineProps<{
  connecting: boolean;
  current_user: User;
  rooms: Map<string, Room>;
  selected_room: Room;
}>();

const store = useExplorerStore();

// store에 props를 업데이트
watch(
  () => ({ connecting, current_user, rooms, selected_room }),
  (props) => {
    store.connecting = props.connecting;
    store.current_user = props.current_user!;
    store.rooms = props.rooms;
    store.selected_room = props.selected_room;
  },
  { immediate: true, deep: true },
);
</script>
