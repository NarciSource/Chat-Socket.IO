<template>
  <!-- 컨테이너 설정으로 레이아웃 컨텐츠 제한 -->
  <q-layout
    view="lHh LpR lFf"
    container
    class="background-with-text shadow-2 rounded-borders"
    :style="style"
  >
    <slot name="room" />

    <q-page-container>
      <slot name="contents" />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
const { width, height } = defineProps<{ width: number; height: number }>();

const style = {
  width: width ? `${width}px` : `100vw`,
  height: height ? `${height}px` : `100vh`,
  // 배경화면 이미지 설정
  backgroundImage: `url('https://picsum.photos/${width}/${height}')`,
};
</script>

<style scoped>
.background-with-text {
  background-color: #eee;
  background-size: cover;
}
/* 배경에 글자 추가 */
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
