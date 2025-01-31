<template>
  <register />

  <layout>
    <template #side-header>
      <make-room />
    </template>
    <template #side>
      <room-list />
    </template>
  </layout>
</template>

<script setup lang="ts">
import { Register, Layout, MakeRoom, RoomList } from "./ui";
</script>
