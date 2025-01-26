<template>
  <div
    class="q-mx-auto q-px-xl text-h6 ellipsis"
    :style="{ visibility: searching ? 'hidden' : 'visible' }"
  >
    {{ room?.name }}
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import useChatStore from "../store/useChatStore";

const { searching, room } = storeToRefs(useChatStore());
</script>
