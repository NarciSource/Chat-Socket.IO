<template>
  <q-btn flat color="green" icon="add" title="초대하기">
    <user-list-popup :on-selected="invite" />
  </q-btn>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import UserListPopup from "@/features/user-presence/index.vue";
import { User } from "@/entities/chat/model";
import useChatStore from "../store/useChatStore";
import { invite_user } from "../service/event_helper";

const { room } = storeToRefs(useChatStore());

const invite = (selected_users: User[]) => {
  const last = selected_users.pop(); // 마지막 선택 사용자만 <- 서버 문제
  invite_user(room.value!, last!);
};
</script>
