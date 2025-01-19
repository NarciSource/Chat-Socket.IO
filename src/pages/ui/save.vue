<template>
  <q-btn flat class="absolute-right q-pa-sm" icon="save" @click="save" />
</template>

<script setup lang="ts">
import { saveAs } from "file-saver";

import { useChatStore } from "../store/chat";

const store = useChatStore();

const save = () => {
  const file_name = `PickMe-Chat-${new Date().toISOString()}.json`;
  const blob = new Blob([JSON.stringify(store.messages)], { type: "application/json" });

  saveAs(blob, file_name);
};
</script>
