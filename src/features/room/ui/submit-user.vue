<template>
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
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import { connect } from "@/entities/chat/service/socketService";
import { useRoomStore } from "../store/room";

const { my_nick, connecting } = storeToRefs(useRoomStore());

const setup = () => {
  // 소켓 연결
  const { register, success } = connect();

  // 서버에 사용자 등록
  register(my_nick.value);

  // 연결 성공시 콜백
  success(() => (connecting.value = true));
};
</script>
