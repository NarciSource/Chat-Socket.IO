<template>
  <chat-widget v-show="show_chat" />
</template>

<script setup lang="ts">
import { ref } from "vue";

import ChatWidget from "@/widgets/chat/index.vue";

const show_chat = ref(true);
</script>
