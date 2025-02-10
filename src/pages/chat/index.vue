<template>
  <q-layout class="no-height">
    <q-page-container>
      <q-page class="no-height">
        <fab-layout v-model="show_chat">
          <chat-widget v-show="show_chat" />
        </fab-layout>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";

import ChatWidget from "@/widgets/chat/index.vue";
import { FabLayout } from "./ui";

const show_chat = ref(false);
</script>

<style scoped>
.no-height {
  height: 0;
  min-height: 0 !important;
}
</style>
