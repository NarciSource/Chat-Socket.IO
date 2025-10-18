<template>
  <layout>
    <template #header>
      <q-toolbar class="q-my-sm">
        <search />
      </q-toolbar>
    </template>

    <template #content> </template>
  </layout>
</template>

<script setup lang="ts">
import { watch } from "vue";

import { Room, User } from "@/entities/chat/model";
import useExplorerStore from "./store/useExplorerStore";
import { Layout, Search } from "./ui";

const { connecting, rooms, current_user, selected_room } = defineProps<{
  connecting: boolean;
  rooms: Map<string, Room>;
  current_user: User | undefined;
  selected_room: Room | null;
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
