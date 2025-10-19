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
import { Layout, Search, Title, Actions, Connect, Content, Submit } from "./ui";
</script>
