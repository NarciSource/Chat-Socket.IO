<template>
  <div
    class="q-mx-auto q-px-xl text-h6 ellipsis"
    :style="{ visibility: searching ? 'hidden' : 'visible' }"
  >
    {{ room?.name || "&nbsp;" }}
    <!-- &nbsp; 방제목 없을 때 공간 차지 -->
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import useChatStore from "../store/useChatStore";

const { searching, room } = storeToRefs(useChatStore());
</script>
