<template>
  <q-layout view="lHh LpR lFf" container class="bg-grey-9 shadow-2 rounded-borders">
    <q-header class="row q-pa-md items-center bg-grey-9">
      <slot name="header" />
      <q-btn
        class="absolute-right q-ma-md q-pa-xs"
        title="더보기"
        flat
        icon="more_vert"
        @click="toggle_toolbar = !toggle_toolbar"
      />
    </q-header>

    <q-drawer
      v-model="toggle_room"
      class="bg-grey-3 overflow-hidden-x"
      show-if-above
      :mini="!toggle_room || mini_toggle_room"
      :width="200"
      :breakpoint="500"
      bordered
      @mouseenter="!side_fixed && (mini_toggle_room = false)"
      @mouseleave="!side_fixed && (mini_toggle_room = true)"
    >
      <slot name="side-header" />

      <q-scroll-area style="height: calc(100% - 96px); margin-bottom: 32px">
        <slot name="side" />
      </q-scroll-area>

      <q-btn
        class="absolute-bottom no-border"
        :title="side_fixed ? '고정 해제' : '고정'"
        flat
        icon="push_pin"
        :color="side_fixed ? 'primary' : 'grey-5'"
        @click="side_fixed = !side_fixed"
      />
    </q-drawer>

    <q-drawer side="right" v-model="toggle_toolbar" class="bg-grey-9" :width="75" :breakpoint="500">
      <slot name="toolbar" />
    </q-drawer>

    <q-page-container class="full-height q-pa-md">
      <slot name="content" />
    </q-page-container>

    <q-footer>
      <div class="row items-end justify-end no-margin q-pa-md q-gutter-x-md bg-white">
        <slot name="footer" />
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";

const toggle_room = ref(true);
const mini_toggle_room = ref(false);
const toggle_toolbar = ref(false);
const side_fixed = ref(true);
</script>

<style scoped>
.q-layout-container {
  display: flex;
  width: 520px !important;
  height: 700px !important;
}
::v-deep(.q-layout) {
  height: 100%;
}
::v-deep(.overflow-hidden-x) {
  overflow-x: hidden !important;
}
</style>
