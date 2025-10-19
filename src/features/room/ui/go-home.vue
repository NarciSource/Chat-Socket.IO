<template>
  <q-item
    class="no-padding"
    active-class="bg-teal-2"
    title="홈으로 가기"
    to="/"
    clickable
    @click="(e) => (e.preventDefault(), click())"
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
import { HistoryState, useRouter } from "vue-router";

import useRoomStore from "../store/useRoomStore";

const router = useRouter();
const { rooms } = useRoomStore();

const click = () => {
  router.push({
    path: `/`,
    state: { rooms } as unknown as HistoryState,
  }); // 방 이동 및 방 상태 전달
};
</script>
