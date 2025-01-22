<template>
  <q-chat-message
    v-for="(message, index) in filtered_messages"
    :key="index"
    :name="!message.is_system ? message.name : ''"
    :label="message.is_system ? message.text[0] : ''"
    :text="!message.is_system ? message.text : []"
    :sent="message.name === my_nick"
    :bg-color="message.name === my_nick ? 'yellow' : 'white'"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";

import { useChatStore } from "../store/chat";

const { my_nick, messages, query } = storeToRefs(useChatStore());

// 검색 결과 필터링
const filtered_messages = computed(() => {
  return messages.value.filter((message) => message.include(query.value));
});
</script>

<style scoped>
::v-deep(.q-message-label) {
  word-break: break-word;
}
</style>
