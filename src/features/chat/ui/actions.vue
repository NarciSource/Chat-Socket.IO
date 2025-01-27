<template>
  <q-list>
    <q-item> <invite /> </q-item>
    <q-item> <save /> </q-item>
    <q-item> <participants /> </q-item>
  </q-list>
</template>

<script setup lang="ts">
import Invite from "./invite.vue"; // 추가 사용자 초대
import Save from "./save.vue"; // 대화를 파일로 저장
import Participants from "./participants.vue"; // 참여자 목록
</script>
