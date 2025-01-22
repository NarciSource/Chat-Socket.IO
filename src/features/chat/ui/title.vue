<template>
  <div class="q-mx-auto text-h6" :style="{ visibility: searching ? 'hidden' : 'visible' }">
    {{ opponent_nick }} 채팅 창
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useChatStore } from "../store/chat";

const { searching, opponent_nick } = storeToRefs(useChatStore());
</script>
