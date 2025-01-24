<template>
  <q-layout view="lhh LpR lff" container>
    <Room />
    <Chat
      v-if="!!selected_room?.id"
      :key="selected_room.id"
      :connecting="connecting"
      :room="selected_room"
      :my_nick="my_nick"
    />
  </q-layout>
</template>

<script setup>
import { storeToRefs } from "pinia";

import Room from "@/features/room";
import Chat from "@/features/chat";
import useRoomStore from "@/features/room/store/useRoomStore";

// feature간 데이터 공유
const { connecting, selected_room, my_nick } = storeToRefs(useRoomStore());
</script>

<style>
.q-layout-container {
  height: calc(100vh - 64px) !important;
}
</style>
