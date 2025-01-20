<template>
  <q-layout view="lhh LpR lff" container>
    <Room />
    <Chat :key="connecting" :connecting="connecting" />
  </q-layout>
</template>

<script setup>
import { storeToRefs } from "pinia";

import Room from "@/features/room";
import Chat from "@/features/chat";
import { useRoomStore } from "@/features/room/store/room";

const { connecting } = storeToRefs(useRoomStore());
</script>

<style>
.q-layout-container {
  height: calc(100vh - 64px) !important;
}
</style>
