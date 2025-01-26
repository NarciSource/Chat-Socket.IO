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
      class="bg-grey-3"
      show-if-above
      :mini="!toggle_room || mini_toggle_room"
      :width="200"
      :breakpoint="500"
      bordered
    >
      <slot name="side" />

      <div class="absolute" style="top: 70px; right: -17px">
        <q-btn
          dense
          round
          unelevated
          color="accent"
          :icon="mini_toggle_room ? 'chevron_right' : 'chevron_left'"
          @click="mini_toggle_room = !mini_toggle_room"
        />
      </div>
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
</script>

<style scoped>
.q-layout-container {
  display: flex;
  width: 800px !important;
  height: 700px !important;
}
::v-deep(.q-layout) {
  height: 100%;
}
::v-deep(.scroll) {
  height: 100%;
  overflow-x: hidden;
}
</style>
