<template>
  <q-btn class="q-ma-md full-width" label="방 만들기" color="teal" text-color="white">
    <q-popup-proxy>
      <user-list v-model="selected_users" />

      <div class="q-ma-md row justify-end q-gutter-sm">
        <q-btn label="생성" color="teal" @click="make" />
        <q-btn label="취소" />
      </div>
    </q-popup-proxy>
  </q-btn>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";

import { SOCKET_EVENT } from "@/shared/socket_event_names";
import Status from "@/entities/chat/model/Status";
import { subscribe, make_room } from "@/entities/chat/service/socketService";
import { useRoomStore } from "../store/room";
import UserList from "./user-list.vue";

const { connecting, my_nick, room_id } = storeToRefs(useRoomStore());
const selected_users = ref<string[]>([]);

// 방 생성
const make = () => {
  if (!connecting.value) {
    alert("연결을 먼저 해주세요");
    return;
  }

  subscribe(SOCKET_EVENT.ON_ROOM_CREATED, (status: Status) => (room_id.value = status.room_id)); // 방 정보 업데이트

  // 다대다 채팅으로 방 생성하고 초대
  make_room(my_nick.value, selected_users.value);
};
</script>
