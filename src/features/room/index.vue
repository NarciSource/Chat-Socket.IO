<template>
  <layout>
    <template #side-header>
      <make-room />
      <q-tooltip v-if="show_tooltip" anchor="top right" @hide="show_tooltip = false">
        접속 중인 사용자를 찾아 채팅을 해보세요.
      </q-tooltip>
    </template>
    <template #side>
      <room-list />
    </template>
  </layout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Layout, MakeRoom, RoomList } from "./ui";

const show_tooltip = ref(true); // 툴팁 표시 여부
</script>
