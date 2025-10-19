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
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import { Room } from "@/entities/chat/model";
import useExplorerStore from "./store/useExplorerStore";
import { Layout, Search, FoundList } from "./ui";

const route = useRoute();
const router = useRouter();
const store = useExplorerStore();

watch(
  () => route.path,
  (route_path) => {
    if (route_path === "/") {
      store.rooms = router.options.history.state["rooms"] as unknown as Map<string, Room>;
    }
  },
  { immediate: true },
);
</script>
