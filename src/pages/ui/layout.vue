<template>
  <q-layout
    view="lHh LpR lFf"
    container
    class="q-layout-background shadow-2 rounded-borders background-with-text"
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

<style scoped>
.background-with-text::before {
  content: "Chat\AService";
  white-space: pre; /* 줄 바꿈 처리 */

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%); /* 정확한 중앙 정렬 */

  color: gold;
  font-family: "Cinzel", serif; /* 폰트 설정 */
  font-size: 30px;
  text-align: center;

  text-shadow: 2px 2px 6px #000;
}
</style>
