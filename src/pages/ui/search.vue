<template>
  <q-input v-model="store.query" dark class="absolute full-width" input-class="text-left q-my-md">
    <template v-slot:prepend>
      <q-icon v-if="store.query === ''" name="search" title="검색" />
      <q-icon v-else name="clear" class="cursor-pointer" @click="store.query = ''" />
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { useChatStore } from "../store/chat";

const store = useChatStore();
</script>

<style scoped>
.q-field {
  padding-right: 32px;
}
</style>
