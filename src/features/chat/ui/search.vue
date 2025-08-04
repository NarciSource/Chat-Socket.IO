<template>
  <q-input
    v-model="query"
    dark
    class="absolute full-width"
    input-class="text-left q-my-md"
    @focus="searching = true"
    @blur="searching = false"
  >
    <template #prepend>
      <q-icon v-if="query === ''" name="search" title="검색" />
      <q-icon v-else name="clear" class="cursor-pointer" @click="query = ''" />
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import useChatStore from "../store/useChatStore";

const { query, searching } = storeToRefs(useChatStore());
</script>

<style scoped>
.q-field {
  padding-right: 32px;
}
</style>
