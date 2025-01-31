<template>
  <q-layout class="service-layout">
    <q-page-container>
      <q-page padding>
        <q-page-sticky position="bottom-right" :offset="fab_position">
          <div class="row">
            <register />
          </div>

          <q-fab
            fab
            icon="chatbubbles-outline"
            direction="up"
            color="teal"
            v-touch-pan.prevent.mouse="move_fab"
            @click="show_chat = !show_chat"
          >
            <chat-window v-show="show_chat" />
          </q-fab>
        </q-page-sticky>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { Register } from "@/features/room";
import { ChatWindow } from "./ui";

const show_chat = ref(false);
const fab_position = ref([18, 18]);
const move_fab = ({ delta }: { delta?: { x?: number; y?: number } }) => {
  fab_position.value = [
    fab_position.value[0] - (delta?.x ?? 0),
    fab_position.value[1] - (delta?.y ?? 0),
  ];
};
</script>

<style scoped>
.service-layout {
  height: 0;
  min-height: 0 !important;
}
</style>
