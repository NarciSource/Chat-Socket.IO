<template>
  <q-btn class="q-ma-md full-width" label="방 만들기" color="teal" text-color="white">
    <q-popup-proxy>
      <user-list v-model="selected_users" />

      <div class="q-ma-md row justify-end q-gutter-sm">
        <q-btn label="생성" color="teal" @click="make" />
        <q-btn label="취소" />
      </div>
    </q-popup-proxy>
  </q-btn>
</template>

<script setup lang="ts">
import { ref } from "vue";

import UserList from "./user-list.vue";

const selected_users = ref<string[]>([]);

const make = () => {
  console.log(selected_users.value);
};
</script>
