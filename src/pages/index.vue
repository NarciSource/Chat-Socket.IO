<template>
  <div class="row">
    <register />
  </div>

  <div class="q-pa-md row justify-center">
    <layout>
      <template #header> <search /> <Title /> </template>

      <template #side-header> <make-room /> </template>
      <template #side> <room-list /> </template>

      <template #connect>
        <connect
          v-if="!!selected_room?.id"
          :connecting="connecting"
          :room="selected_room"
          :current_user="current_user"
        />
      </template>

      <template #content> <content /> </template>

      <template #toolbar> <actions /> </template>

      <template #footer> <submit /> </template>
    </layout>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";

import { Register, MakeRoom, RoomList, useRoomStore } from "@/features/room";
import { Connect, Content, Submit, Actions, Title, Search } from "@/features/chat";
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
