<template>
  <div class="q-pa-md row justify-center" @click.stop>
    <register />

    <layout :width="LAYOUT_WIDTH" :height="LAYOUT_HEIGHT">
      <template #room>
        <room />
      </template>

      <template #contents>
        <router-view />
      </template>
    </layout>
  </div>
</template>

<script setup>
import Room from "@/features/room";
import { Register } from "@/features/user-auth";
import { Layout } from "./ui";

// 레이아웃 크기
const LAYOUT_WIDTH = Number(import.meta.env.VITE_LAYOUT_WIDTH);
const LAYOUT_HEIGHT = Number(import.meta.env.VITE_LAYOUT_HEIGHT);
</script>
