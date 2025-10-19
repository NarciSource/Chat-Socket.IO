<template>
  <q-list>
    <q-item
      v-for="[, room] in rooms"
      :key="room.id"
      :to="`/room/${room.id}`"
      active-class="bg-teal-2"
      :title="room.name"
      clickable
      @click="(e) => (e.preventDefault(), enter(room))"
    >
      <q-item-section side>
        <avatar :user="room.participants[0]">
          <q-badge v-if="room.is_new" color="primary" rounded floating label="New" />
          <q-badge v-else color="primary" rounded floating :label="room.participants.length" />
        </avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>
          <q-input v-model="room.name" borderless dense title="방 제목 수정" />
        </q-item-label>
      </q-item-section>

      <q-item-section>
        <leave-room :room="room" />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
import { HistoryState, useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import { Room } from "@/entities/chat/model";
import { Avatar } from "@/shared/components";
import useRoomStore from "../store/useRoomStore";
import LeaveRoom from "./leave-room.vue";

const router = useRouter();
const { rooms } = storeToRefs(useRoomStore());

const enter = (room: Room) => {
  room.is_new = false; // 새로운 방 표시 해제

  router.push({
    path: `/room/${room.id}`,
    state: { room } as unknown as HistoryState,
  }); // 방 이동 및 방 상태 전달
};
</script>
