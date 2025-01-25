<template>
  <q-btn class="q-pa-md full-width" label="방 만들기" color="teal" text-color="white">
    <user-list-popup :onSelected="make" />
  </q-btn>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { storeToRefs } from "pinia";

import { Room, User } from "@/entities/chat/model";
import UserListPopup from "@/features/users/index.vue";
import { make_room, room_created } from "../service/event_helper";
import useRoomStore from "../store/useRoomStore";

const { connecting, my_nick, rooms } = storeToRefs(useRoomStore());
const show = ref(false);

const make = (selected_users: User[]) => {
  // 다대다 채팅으로 방 생성하고 초대
  make_room(
    my_nick.value,
    selected_users.map((user) => user.name),
  );
  // 팝업 닫기
  show.value = false;
};

watchEffect(() => {
  if (!!connecting.value) {
    // 방 생성 후의 이벤트 리스너 등록
    room_created((room: Room) => rooms.value.add(room)); // 방 정보 업데이트
  }
});
</script>
