<template>
  <div class="q-mx-auto text-h6" :style="{ visibility: searching ? 'hidden' : 'visible' }">
    {{ room_id }} 채팅 창
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useChatStore } from "../store/chat";

const { searching, room_id } = storeToRefs(useChatStore());
</script>
