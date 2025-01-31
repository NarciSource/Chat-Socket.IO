<template>
    <div class="q-pa-md row justify-center">
      <layout :width="LAYOUT_WIDTH" :height="LAYOUT_HEIGHT">
        <template #room>
          <room />
        </template>
  
        <template #chat>
          <chat
            v-if="!!selected_room?.id"
            :connecting="connecting"
            :room="selected_room"
            :current_user="current_user"
          />
        </template>
      </layout>
    </div>
  </template>
  
  <script setup>
  import { storeToRefs } from "pinia";
  
  import Room, { useRoomStore } from "@/features/room";
  import Chat from "@/features/chat";
  import Layout from "./ui/layout.vue";
  
  // 레이아웃 크기
  const LAYOUT_WIDTH = import.meta.env.VITE_LAYOUT_WIDTH || 500;
  const LAYOUT_HEIGHT = import.meta.env.VITE_LAYOUT_HEIGHT || 700;
  
  // feature간 데이터 공유
  const { connecting, selected_room, current_user } = storeToRefs(useRoomStore());
  </script>
  