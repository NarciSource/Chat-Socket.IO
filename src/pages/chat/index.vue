<template>
  <q-layout class="full-height">
    <q-page-container>
      <q-page padding>
        <div class="row">
          <register />
        </div>

        <chat-window v-show="show_chat" />

        <q-page-sticky position="bottom-right" :offset="[18, 18]">
          <q-btn fab icon="chatbubbles-outline" color="teal" @click="show_chat = !show_chat" />
        </q-page-sticky>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";

import { Register } from "@/features/room";
import { ChatWindow } from "./ui";

const show_chat = ref(false);
</script>
