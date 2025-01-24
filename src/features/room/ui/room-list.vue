<template>
  <q-list>
    <q-item
      v-for="room in rooms"
      :active="room === selected_room"
      active-class="bg-teal-2"
      clickable
      @click="() => enter(room)"
    >
      <q-item-section>
        <q-item-label>
          <q-input v-model="room.name" title="방 제목 수정" borderless dense />
        </q-item-label>
      </q-item-section>

      <q-item-section side v-show="room.is_new">
        <q-badge rounded color="primary" label="New" />
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
import useRoomStore from "../store/useRoomStore";
import LeaveRoom from "./leave-room.vue";

const { rooms, selected_room } = storeToRefs(useRoomStore());

const enter = (room: Room) => {
  selected_room.value = room;
  room.is_new = false;
};
</script>
