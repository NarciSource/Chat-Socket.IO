<template>
  <q-btn class="q-px-xs" flat color="red" icon="logout" title="방 나가기" to="/" @click="leave" />
</template>

<script setup lang="ts">
import { HistoryState, useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import { Room } from "@/entities/chat/model";
import { RouterName } from "@/shared/constants";
import useRoomStore from "../store/useRoomStore";
import { leave_room } from "../service/event_helper";

const router = useRouter();
const { current_user, rooms } = storeToRefs(useRoomStore());
const { room } = defineProps<{ room: Room }>();

const leave = () => {
  // 방 나가기
  leave_room(current_user.value!, room);

  // 방 목록에서 제거
  rooms.value.delete(room.id);

  router.push({
    name: RouterName.Explorer,
    state: { rooms: rooms.value } as unknown as HistoryState,
  }); // 방 이동 및 방 상태 전달
};
</script>
