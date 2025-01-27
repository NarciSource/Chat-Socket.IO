<template>
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
    />
  </q-drawer>
</template>

<script setup lang="ts">
import { ref } from "vue";

const toggle_room = ref(true);
const mini_toggle_room = ref(false);
const side_fixed = ref(true);
</script>

<style scoped>
.side-content {
  height: calc(100% - 96px);
  margin-bottom: 32px;
}
</style>
