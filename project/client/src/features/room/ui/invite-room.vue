<template>
  <user-list-popup :on-selected="invite" />
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import UserListPopup from "@/features/user-presence/index.vue";
import { User } from "@/entities/chat/model";
import useRoomStore from "../store/useRoomStore";
import { invite_room } from "../service/event_helper";

const { selected_room } = storeToRefs(useRoomStore());

const invite = (selected_users: User[]) => {
  const last = selected_users.pop(); // 마지막 선택 사용자만 <- 서버 문제
  invite_room(selected_room.value!, last!);
};
</script>
