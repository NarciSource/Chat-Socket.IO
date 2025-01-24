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
        <q-item-label>{{ room }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import useRoomStore from "../store/useRoomStore";

const { rooms, selected_room } = storeToRefs(useRoomStore());

const enter = (room: string) => {
  selected_room.value = room;
};
</script>
