<template>
  <q-input
    v-model="keyword"
    label="검색"
    class="absolute-top-right q-px-md"
    rounded
    standout="bg-teal text-white"
  >
    <template #append>
      <q-btn title="검색" flat round icon="search" />
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { ref } from "vue";

const keyword = ref("");
</script>
