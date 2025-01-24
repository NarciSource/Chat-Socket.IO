<template>
  <drawer-layout>
    <register />

    <make-room />

    <room-list />
  </drawer-layout>
</template>

<script setup lang="ts">
import { DrawerLayout, MakeRoom, Register, RoomList } from "./ui";
</script>
