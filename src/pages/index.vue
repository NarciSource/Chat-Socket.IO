<template>
  <q-layout view="lhh LpR lff" container>
    <Room />
    <Chat
      v-if="opponent_nick"
      :key="opponent_nick"
      :connecting="connecting"
      :my_nick="my_nick"
      :opponent_nick="opponent_nick"
    />
  </q-layout>
</template>

<script setup>
import { storeToRefs } from "pinia";

import Room from "@/features/room";
import Chat from "@/features/chat";
import { useRoomStore } from "@/features/room/store/room";

const { connecting, my_nick, opponent_nick } = storeToRefs(useRoomStore());
</script>

<style>
.q-layout-container {
  height: calc(100vh - 64px) !important;
}
</style>
