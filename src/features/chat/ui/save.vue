<template>
  <q-btn flat color="blue" icon="save" title="파일로 저장" @click="save" />
</template>

<script setup lang="ts">
import { saveAs } from "file-saver";

import useChatStore from "../store/useChatStore";

const { messages, room } = useChatStore();

const save = () => {
  const file_name = `PickMe-Chat-${room?.name}-${new Date().toISOString()}.json`;
  const blob = new Blob([JSON.stringify(messages)], { type: "application/json" });

  saveAs(blob, file_name);
};
</script>
