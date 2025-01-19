<template>
  <q-chat-message
    v-for="(message, index) in filtered_messages"
    :key="index"
    :label="message.is_system ? message.text[0] : ''"
    :text="!message.is_system ? message.text : []"
    :sent="message.sent"
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
