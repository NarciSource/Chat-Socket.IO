<template>
  <user-list-popup :on-selected="invite" />
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

import UserListPopup from "@/features/user-presence/index.vue";
import { User } from "@/entities/chat/model";
import useRoomStore from "../store/useRoomStore";
import { invite_room } from "../service/event_helper";

const route = useRoute();
const { rooms } = useRoomStore();

const invite = (selected_users: User[]) => {
  const last = selected_users.pop(); // 마지막 선택 사용자만 <- 서버 문제

  const room_id = route.params["id"] as string;

  invite_room(rooms.get(room_id)!, last!);
};
</script>
