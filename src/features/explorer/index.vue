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
import { Layout, Search, FoundList } from "./ui";
</script>
