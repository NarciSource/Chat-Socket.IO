<template>
  <q-card v-if="MANUAL_USER_SET">
    <q-card-section class="text-h6">수동 등록</q-card-section>
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
import { ref } from "vue";
import { storeToRefs } from "pinia";

import getUser from "@/shared/lib/getUser";
import { User } from "@/entities/chat/model";
import { connect } from "@/entities/chat/service/socketService";
import useRoomStore from "../store/useRoomStore";

const MANUAL_USER_SET = import.meta.env.VITE_MANUAL_USER_SET === "true" || false;

const { current_user, connecting } = storeToRefs(useRoomStore());
const my_nick = ref("");

const setup = () => {
  // 소켓 연결
  const { register, success } = connect();

  // 사용자 정보 생성
  current_user.value = new User(my_nick.value);

  // 서버에 사용자 등록
  register(current_user.value.name);

  // 연결 성공시 콜백
  success(() => (connecting.value = true));
};

if (!MANUAL_USER_SET) {
  const { username } = getUser();
  my_nick.value = username;

  setup();
}
</script>
