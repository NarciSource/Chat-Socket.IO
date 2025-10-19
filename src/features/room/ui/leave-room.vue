<template>
  <q-btn class="q-px-xs" flat color="red" icon="logout" title="방 나가기" to="/" @click="leave" />
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import { Room } from "@/entities/chat/model";
import useRoomStore from "../store/useRoomStore";
import { leave_room } from "../service/event_helper";

const { current_user, rooms } = storeToRefs(useRoomStore());
const { room } = defineProps<{ room: Room }>();

const leave = () => {
  // 방 나가기
  leave_room(current_user.value!, room);

  // 방 목록에서 제거
  rooms.value.delete(room.id);
};
</script>
