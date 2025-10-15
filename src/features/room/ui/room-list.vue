<template>
  <q-list>
    <q-item
      v-for="[, room] in rooms"
      :key="room.id"
      :active="room === selected_room"
      active-class="bg-teal-2"
      :title="room.name"
      clickable
      @click="() => enter(room)"
    >
      <q-item-section>
        <q-item-label>
          <q-input v-model="room.name" title="방 제목 수정" borderless dense />
        </q-item-label>
      </q-item-section>

      <q-item-section side>
        <avatar :user="room.participants[0]">
          <q-badge v-if="room.is_new" color="primary" rounded floating label="New" />
          <q-badge v-else color="primary" rounded floating :label="room.participants.length" />
        </avatar>
      </q-item-section>

      <q-item-section side>
        <leave-room :room="room" />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import { Room } from "@/entities/chat/model";
import { Avatar } from "@/shared/components";
import useRoomStore from "../store/useRoomStore";
import LeaveRoom from "./leave-room.vue";

const { rooms, selected_room } = storeToRefs(useRoomStore());

const enter = (room: Room) => {
  selected_room.value = room; // 선택 방을 업데이트
  room.is_new = false; // 새로운 방 표시 해제
};
</script>
