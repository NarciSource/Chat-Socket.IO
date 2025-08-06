<template>
  <manual-register v-if="MANUAL_USER_SET" :setup="setup" />
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import { User } from "@/entities/chat/model";
import { connect } from "@/entities/chat/service/socketService";
import getUser from "@/shared/lib/getUser";
import useUserStore from "../store/useUserStore";
import manualRegister from "./manual-register.vue";

const MANUAL_USER_SET = import.meta.env.VITE_MANUAL_USER_SET === "true" || false;

const { current_user, connecting } = storeToRefs(useUserStore());

const setup = (my_nick: string) => {
  // 소켓 연결
  const { register, success } = connect();

  // 사용자 정보 생성
  current_user.value = new User(my_nick);

  // 서버에 사용자 등록
  register(current_user.value.name);

  // 연결 성공시 콜백
  success(() => (connecting.value = true));
};

if (!MANUAL_USER_SET) {
  // auth-parcel을 통해 사용자 정보 가져오기
  const { username } = getUser();
  setup(username);
}
</script>
