<template>
  <q-chat-message
    v-for="(message, index) in filtered_messages"
    :key="index"
    :name="!message.is_system ? message.name : ''"
    :avatar="!message.is_system ? message.owner.avatar_url : undefined"
    :label="message.is_system ? message.text[0] : ''"
    :text="!message.is_system ? message.text : []"
    :stamp="message.created_at.toLocaleTimeString()"
    :sent="message.name === current_user?.name"
    :bg-color="message.name === current_user?.name ? 'yellow' : 'white'"
  />
  <q-chat-message
    v-show="!!typing_user"
    :name="typing_user?.name"
    :avatar="typing_user?.avatar_url"
    bg-color="white"
  >
    <q-spinner-dots size="1rem" />
  </q-chat-message>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";

import useChatStore from "../store/useChatStore";

const { current_user, messages, query, typing_user } = storeToRefs(useChatStore());

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
