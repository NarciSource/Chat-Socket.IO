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
import { watchEffect } from "vue";
import { useRoute } from "vue-router";

import { Layout, Search, Title, Actions, Connect, Content, Submit } from "./ui";
import useChatStore from "./store/useChatStore";

const route = useRoute();
const store = useChatStore();

watchEffect(() => {
  store.room_id = route.params["id"] as string;
});
</script>
