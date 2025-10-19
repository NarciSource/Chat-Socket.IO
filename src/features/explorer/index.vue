<template>
  <layout>
    <template #header>
      <q-toolbar class="q-my-sm">
        <search />
      </q-toolbar>
    </template>

    <template #content>
      <found-list />
    </template>
  </layout>
</template>

<script setup lang="ts">
import { watchEffect } from "vue";
import { useRouter } from "vue-router";

import { Room } from "@/entities/chat/model";
import useExplorerStore from "./store/useExplorerStore";
import { Layout, Search, FoundList } from "./ui";

const router = useRouter();
const store = useExplorerStore();

watchEffect(() => {
  store.rooms = router.options.history.state["rooms"] as unknown as Map<string, Room>;
});
</script>
