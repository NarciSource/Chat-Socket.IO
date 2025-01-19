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
import Message from "@/entities/Message";

defineProps<{ messages: Message[] }>();
</script>
