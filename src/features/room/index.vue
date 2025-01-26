<template>
  <div class="row">
    <register />
  </div>

  <Layout>
    <template #side>
      <make-room />
      <room-list />
    </template>

    <template #content>
      <slot />
    </template>
  </Layout>
</template>

<script setup lang="ts">
import { Layout, MakeRoom, Register, RoomList } from "./ui";
</script>
