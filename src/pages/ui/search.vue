<template>
  <q-input v-model="store.query" dark class="absolute" input-class="text-left">
    <template v-slot:prepend>
      <q-icon v-if="store.query === ''" name="search" />
      <q-icon v-else name="clear" class="cursor-pointer" @click="store.query = ''" />
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { useChatStore } from "../store/chat";

const store = useChatStore();
</script>

<style scoped>
::v-deep(.q-field__control::before) {
  border-bottom: none !important;
}
</style>
