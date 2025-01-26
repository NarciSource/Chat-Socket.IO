<template>
  <div class="row">
    <register />
  </div>

  <div class="q-pa-md row justify-center">
    <layout>
      <template #header> <Search /> <Title /> </template>

      <template #side>
        <make-room />
        <room-list />
      </template>

      <template #content>
        <Chat
          v-if="!!selected_room?.id"
          :connecting="connecting"
          :room="selected_room"
          :current_user="current_user"
        />
      </template>

      <template #toolbar> <Actions /> </template>

      <template #footer> <Submit /> </template>
    </layout>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";

import useRoomStore from "@/features/room/store/useRoomStore";
import { Register, MakeRoom, RoomList } from "@/features/room/ui";
import { Submit, Actions, Title, Search } from "@/features/chat/ui";
import Chat from "@/features/chat";
import Layout from "./ui/layout.vue";

// feature간 데이터 공유
const { connecting, selected_room, current_user } = storeToRefs(useRoomStore());
</script>

<style>
.q-layout-container {
  height: calc(100vh - 64px) !important;
}
</style>
