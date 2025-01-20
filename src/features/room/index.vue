<template>
  <drawer-layout>
    <div class="q-pa-md">
      <q-input v-model="my_nick" label="내 닉네임" />
      <q-input v-model="opponent_nick" label="상대방 닉네임" />
      <q-btn
        class="q-ma-md full-width"
        label="연결"
        color="teal"
        text-color="white"
        @click="create_room"
      />
    </div>
  </drawer-layout>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useRoomStore } from "./store/room";
import { connect } from "@/entities/chat/service/socketService";
import drawerLayout from "./ui/drawer-layout.vue";

const { my_nick, opponent_nick, connecting } = storeToRefs(useRoomStore());

const create_room = () => {
  // 소켓 연결
  const { register, success } = connect();

  // 서버에 사용자 등록
  register(my_nick.value);

  // 연결 성공시 콜백
  success(() => (connecting.value = true));
};
</script>
