<template>
  <q-page-sticky position="bottom-right" :offset="fab_position">
    <div class="row">
      <register />
    </div>

    <q-fab
      fab
      icon="chatbubbles-outline"
      direction="up"
      color="teal"
      v-touch-pan.prevent.mouse="move_fab"
      @click="action = !action"
    >
      <slot />
    </q-fab>
  </q-page-sticky>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { Register } from "@/features/room";

const action = defineModel<boolean>({ required: true });

// FAB버튼 드래그 기능
const fab_position = ref([18, 18]);
const move_fab = ({ delta }: { delta?: { x?: number; y?: number } }) => {
  fab_position.value = [
    fab_position.value[0] - (delta?.x ?? 0),
    fab_position.value[1] - (delta?.y ?? 0),
  ];
};
</script>
