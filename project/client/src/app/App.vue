<template>
  <widget-page v-if="!standalone" />
  <standalone-page v-else />
</template>

<script setup>
import { WidgetPage, StandalonePage } from "@/pages/chat";

const standalone = import.meta.env.VITE_STANDALONE === "true";
</script>
