<template>
  <q-item
    class="no-padding"
    :class="!selected_room && 'bg-teal-2'"
    title="홈으로 가기"
    clickable
    @click="selected_room = null"
  >
    <q-item-section avatar>
      <q-icon class="q-pa-md text-teal-8" name="home" size="2rem" />
    </q-item-section>

    <q-item-section>
      <q-item-label>홈으로 가기</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import useRoomStore from "../store/useRoomStore";

const { selected_room } = storeToRefs(useRoomStore());
</script>
