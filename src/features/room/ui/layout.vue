<template>
  <q-drawer
    v-model="toggle_room"
    class="bg-grey-3 overflow-hidden-x"
    show-if-above
    :mini="!toggle_room || mini_toggle_room"
    :width="200"
    :breakpoint="WINDOW_WIDTH - 1"
    bordered
    @mouseenter="!side_fixed && (mini_toggle_room = false)"
    @mouseleave="!side_fixed && (mini_toggle_room = true)"
  >
    <slot name="side-header" />

    <q-scroll-area class="side-content">
      <slot name="side" />
    </q-scroll-area>

    <q-btn
      class="absolute-bottom no-border"
      :title="side_fixed ? '고정 해제' : '고정'"
      flat
      icon="push_pin"
      :color="side_fixed ? 'primary' : 'grey-5'"
      @click="side_fixed = !side_fixed"
    >
      <q-tooltip anchor="top right" v-if="show_tooltip" @hide="show_tooltip = false">
        방 목록을 확장하고 줄일 수 있습니다.
      </q-tooltip>
    </q-btn>
  </q-drawer>
</template>

<script setup lang="ts">
import { ref } from "vue";

const WINDOW_WIDTH = import.meta.env.VITE_WINDOW_WIDTH;

const toggle_room = ref(true); // 방 목록을 보여줄지 여부
const mini_toggle_room = ref(true); // 방 목록을 최소화할지 여부
const side_fixed = ref(true); // 방 목록 고정 여부
const show_tooltip = ref(true); // 툴팁 표시 여부
</script>

<style scoped>
.side-content {
  height: calc(100% - 96px); /* 상단 버튼과 pin 버튼 처리 */
  margin-bottom: 32px; /* 하단 pin 높이 */
}
</style>
