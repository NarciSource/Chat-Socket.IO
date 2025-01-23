<template>
  <q-list>
    <q-item v-for="(user, index) in users" clickable v-ripple @click="() => join(user)">
      <q-item-section avatar>
        <q-avatar class="overlapping">
          <img :src="`https://cdn.quasar.dev/img/avatar${index + 1}.jpg`" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ user }}</q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-badge rounded color="green" />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";

import { join_room } from "@/entities/chat/service/socketService";
import { useRoomStore } from "../store/room";

const { my_nick, room_id, connecting } = storeToRefs(useRoomStore());
const users = ref(["user1", "user2", "user3"]);

// 방 생성
const join = (opponent_nick: string) => {
  if (!connecting.value) {
    alert("연결을 먼저 해주세요");
    return;
  }
  // 일대일 채팅으로 상대방 이름을 방 이름으로 설정
  room_id.value = opponent_nick;

  // 방 생성
  join_room(my_nick.value, room_id.value);
};
</script>
