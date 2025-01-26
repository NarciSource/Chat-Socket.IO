<template>
  <q-btn flat color="green" icon="add" title="초대하기">
    <user-list-popup :onSelected="invite" />
  </q-btn>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";

import { User } from "@/entities/chat/model";
import UserListPopup from "@/features/users/index.vue";
import useChatStore from "../store/useChatStore";
import { invite_user } from "../service/event_helper";

const { room } = storeToRefs(useChatStore());
const show = ref(false);

const invite = (selected_users: User[]) => {
  const last = selected_users.pop();
  invite_user(room.value!, last!);
  // 팝업 닫기
  show.value = false;
};
</script>
