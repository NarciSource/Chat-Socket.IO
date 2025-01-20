<template>
  <q-layout view="lhh LpR lff" container>
    <Room />
    <Chat />
  </q-layout>
</template>

<script setup>
import Room from "@/features/room";
import Chat from "@/features/chat";
</script>

<style>
.q-layout-container {
  height: calc(100vh - 64px) !important;
}
</style>
