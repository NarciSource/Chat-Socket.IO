<template>
  <q-item class="no-padding bg-teal-8 text-white" title="방 만들기" clickable>
    <q-item-section avatar>
      <q-icon class="q-pa-md" name="meeting_room" size="2rem" />
    </q-item-section>
    <q-item-section>방 만들기</q-item-section>
    <user-list-popup v-if="connecting" :on-selected="make" />
  </q-item>
</template>

<script setup lang="ts">
import { watchEffect } from "vue";
import { storeToRefs } from "pinia";

import UserListPopup from "@/features/user-presence/index.vue";
import { Room, User } from "@/entities/chat/model";
import { make_room, room_created } from "../service/event_helper";
import useRoomStore from "../store/useRoomStore";

const { connecting, current_user, rooms, selected_room } = storeToRefs(useRoomStore());

// 다대다 채팅으로 방 생성하고 초대
const make = (selected_users: User[]) => {
  make_room(current_user.value!, selected_users);
};

watchEffect(() => {
  if (connecting.value) {
    // 방 생성 후의 이벤트 리스너 등록
    room_created((room: Room) => {
      rooms.value.set(room.id, room); // 방 정보 업데이트
      selected_room.value = room; // 선택 방 업데이트
    });
  }
});
</script>
