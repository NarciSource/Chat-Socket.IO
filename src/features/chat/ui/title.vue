<template>
  <div class="q-mx-auto text-h6" :style="{ visibility: searching ? 'hidden' : 'visible' }">
    {{ room!.participants }}
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import useChatStore from "../store/useChatStore";

const { searching, room } = storeToRefs(useChatStore());
</script>
