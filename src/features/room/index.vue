<template>
  <drawer-layout>
    <div class="q-pa-md">
      <q-card>
        <q-card-section>유저 정보로 자동 처리 예정</q-card-section>
        <q-card-section>
          <q-input v-model="my_nick" label="내 닉네임" />
          <q-btn
            class="q-ma-md full-width"
            label="연결"
            color="teal"
            text-color="white"
            @click="setup"
          />
        </q-card-section>
      </q-card>

      <q-input v-model="opponent_nick" label="상대방 닉네임" />

      <q-btn
        class="q-ma-md full-width"
        label="방 생성"
        color="teal"
        text-color="white"
        @click="join"
      />
    </div>
  </drawer-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";

import { useRoomStore } from "./store/room";
import { connect, join_room } from "@/entities/chat/service/socketService";
import drawerLayout from "./ui/drawer-layout.vue";

const { my_nick, connecting, room_id } = storeToRefs(useRoomStore());
const opponent_nick = ref("");

const setup = () => {
  // 소켓 연결
  const { register, success } = connect();

  // 서버에 사용자 등록
  register(my_nick.value);

  // 연결 성공시 콜백
  success(() => (connecting.value = true));
};

// 방 생성
const join = () => {
  if (!connecting.value) {
    alert("연결을 먼저 해주세요");
    return;
  }
  room_id.value = opponent_nick.value;

  join_room(my_nick.value, room_id.value);
};
</script>
