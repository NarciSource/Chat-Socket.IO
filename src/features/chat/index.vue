<template>
  <layout>
    <template #header>
      <search />
      <Title />
    </template>

    <template #toolbar> <actions /> </template>

    <template #content>
      <connect>
        <content />
      </connect>
    </template>

    <template #footer> <submit /> </template>
  </layout>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import { Room } from "@/entities/chat/model";
import { Layout, Search, Title, Actions, Connect, Content, Submit } from "./ui";
import useChatStore from "./store/useChatStore";

const route = useRoute();
const router = useRouter();
const store = useChatStore();

watch(
  () => route.params.id,
  () => {
    store.room = router.options.history.state["room"] as unknown as Room;
  },
  { immediate: true },
);
</script>
