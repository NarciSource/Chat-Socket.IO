<template>
  <q-input v-model="my_nick" label="내 닉네임" />
  <q-input v-model="opponent_nick" label="상대방 닉네임" />
  <q-btn label="연결" color="yellow" text-color="black" @click="create_room" />
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useRoomStore } from "./store/room";
import { register } from "@/entities/service/socketService";

const { my_nick, opponent_nick } = storeToRefs(useRoomStore());

const create_room = () => {
  register(my_nick.value);
};
</script>
