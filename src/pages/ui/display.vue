<template>
  <q-chat-message
    v-for="(message, index) in messages"
    :key="index"
    :sent="message.sent"
    :text="message.text"
    :bg-color="message.sent ? 'yellow' : 'white'"
  />
</template>

<script setup lang="ts">
import { useChatStore } from "../store/chat";

const { messages } = useChatStore();
</script>
