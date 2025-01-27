<template>
  <div class="row">
    <register />
  </div>

  <div class="q-pa-md row justify-center">
    <layout>
      <template #room>
        <room />
      </template>

      <template #chat>
        <chat
          v-if="!!selected_room?.id"
          :connecting="connecting"
          :room="selected_room"
          :current_user="current_user"
        />
      </template>
    </layout>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";

import Room, { Register, useRoomStore } from "@/features/room";
import Chat from "@/features/chat";
import Layout from "./ui/layout.vue";

// feature간 데이터 공유
const { connecting, selected_room, current_user } = storeToRefs(useRoomStore());
</script>

<style scoped>
.q-layout-container {
  width: 520px !important;
  height: 700px !important;
}
</style>
