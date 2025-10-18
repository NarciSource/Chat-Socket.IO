<template>
  <div class="q-pa-md row justify-center" @click.stop>
    <register />

    <layout :width="LAYOUT_WIDTH" :height="LAYOUT_HEIGHT">
      <template #room>
        <room :connecting="connecting" :current_user="current_user" />
      </template>

      <template #contents>
        <explorer
          v-if="!selected_room?.id"
          :connecting="connecting"
          :rooms="rooms"
          :selected_room="selected_room"
          :current_user="current_user"
        />
        <chat v-else :connecting="connecting" :room="selected_room" :current_user="current_user" />
      </template>
    </layout>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";

import Explorer from "@/features/explorer";
import Room, { useRoomStore } from "@/features/room";
import { Register } from "@/features/user-auth";
import Chat from "@/features/chat";
import useUserStore from "@/features/user-auth/store/useUserStore";
import { Layout } from "./ui";

// 레이아웃 크기
const LAYOUT_WIDTH = Number(import.meta.env.VITE_LAYOUT_WIDTH);
const LAYOUT_HEIGHT = Number(import.meta.env.VITE_LAYOUT_HEIGHT);

// feature간 데이터 공유
const { connecting, current_user } = storeToRefs(useUserStore());
const { selected_room, rooms } = storeToRefs(useRoomStore());
</script>
