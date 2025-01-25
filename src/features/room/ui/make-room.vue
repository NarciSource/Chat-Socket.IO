<template>
  <q-btn class="q-pa-md full-width" label="방 만들기" color="teal" text-color="white">
    <q-popup-proxy v-model="show">
      <user-list v-model="selected_users" />

      <div class="q-ma-md row justify-end q-gutter-sm">
        <q-btn label="생성" color="teal" @click="make" />
        <q-btn label="취소" @click="show = false" />
      </div>
    </q-popup-proxy>
  </q-btn>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref, watchEffect } from "vue";

import { Room } from "@/entities/chat/model";
import { make_room, room_created } from "../service/event_helper";
import useRoomStore from "../store/useRoomStore";
import UserList from "./user-list.vue";

const { connecting, my_nick, rooms } = storeToRefs(useRoomStore());
const selected_users = ref<string[]>([]);
const show = ref(false);

const make = () => {
  // 다대다 채팅으로 방 생성하고 초대
  make_room(my_nick.value, selected_users.value);
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
