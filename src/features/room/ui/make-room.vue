<template>
  <q-btn class="q-ma-md full-width" label="방 만들기" color="teal" text-color="white">
    <q-popup-proxy>
      <user-list />

      <div class="q-ma-md row justify-end q-gutter-sm">
        <q-btn label="생성" color="teal" />
        <q-btn label="취소" />
      </div>
    </q-popup-proxy>
  </q-btn>
</template>

<script setup lang="ts">
import UserList from "./user-list.vue";
</script>
