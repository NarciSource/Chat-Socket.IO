<template>
  <q-layout
    view="lHh LpR lFf"
    container
    class="q-layout-background shadow-2 rounded-borders"
    :style="style"
  >
    <slot name="room" />

    <slot name="chat" />
  </q-layout>
</template>

<script setup lang="ts">
const { width, height } = defineProps<{ width: number; height: number }>();

const style = {
  width: `${width}px`,
  height: `${height}px`,
  backgroundImage: `url('https://picsum.photos/${width}/${height}')`,
  backgroundSize: "cover",
};
</script>
