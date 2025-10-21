<template>
  <q-input
    v-model="keyword"
    label="검색"
    class="absolute-top-right q-px-md"
    rounded
    standout="bg-teal text-white"
    @keyup.enter="send"
  >
    <template #append>
      <q-btn title="검색" flat round icon="search" @click="send" />
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";

import { search } from "@/entities/chat/service/restService";
import useExplorerStore from "../store/useExplorerStore";

const { current_user, search_result } = storeToRefs(useExplorerStore());
const keyword = ref("");

const send = async () => {
  search_result.value = await search({ userId: current_user.value!.id, keyword: keyword.value });
};
</script>
