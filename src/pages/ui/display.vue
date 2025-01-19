<template>
  <q-chat-message
    v-for="(message, index) in filtered_messages"
    :key="index"
    :sent="message.sent"
    :text="message.text"
    :bg-color="message.sent ? 'yellow' : 'white'"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useChatStore } from "../store/chat";

const store = useChatStore();

const filtered_messages = computed(() => {
  return store.messages.filter((message) => message.include(store.query));
});
</script>
