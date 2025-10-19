<template>
  <div class="q-pa-md row justify-center" @click.stop>
    <register />

    <layout :width="LAYOUT_WIDTH" :height="LAYOUT_HEIGHT">
      <template #room>
        <room />
      </template>

      <template #contents>
        <explorer v-if="!selected_room?.id" />
        <chat v-else />
      </template>
    </layout>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";

import Explorer from "@/features/explorer";
import Room from "@/features/room";
import { Register } from "@/features/user-auth";
import Chat from "@/features/chat";
import useGlobalStore from "@/shared/store/useGlobalStore";
import { Layout } from "./ui";

// 레이아웃 크기
const LAYOUT_WIDTH = Number(import.meta.env.VITE_LAYOUT_WIDTH);
const LAYOUT_HEIGHT = Number(import.meta.env.VITE_LAYOUT_HEIGHT);

// feature간 데이터 공유
const { selected_room } = storeToRefs(useGlobalStore());
</script>
