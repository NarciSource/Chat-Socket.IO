<template>
  <q-page-sticky position="bottom-right" :offset="fab_position">
    <q-fab
      v-touch-pan.prevent.mouse="move_fab"
      fab
      icon="chatbubbles-outline"
      :direction="fab_direction"
      color="teal"
      @click="((action = !action), (render = true))"
    >
      <slot v-if="render" />
    </q-fab>
  </q-page-sticky>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const action = defineModel<boolean>({ required: true });
const render = ref(false);
const fab_direction = ref<"up" | "down" | "left" | "right">("up");

// FAB버튼 드래그 기능
const fab_position = ref([18, 18]); // 우하단 기준
const move_fab = ({ delta }: { delta?: { x?: number; y?: number } }) => {
  fab_position.value = [
    fab_position.value[0] - (delta?.x ?? 0),
    fab_position.value[1] - (delta?.y ?? 0),
  ];
};

// FAB 컨텐츠의 방향 설정
const change_direction = () => {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const [x, y] = fab_position.value;

  if (x < screenWidth * (1 / 4)) {
    fab_direction.value = "left";
  }
  if (x > screenWidth * (3 / 4)) {
    fab_direction.value = "right";
  }
  if (y < screenHeight * (1 / 4)) {
    fab_direction.value = "up";
  }
  if (y > screenHeight * (3 / 4)) {
    fab_direction.value = "down";
  }
};

watch(fab_position, change_direction);
</script>
