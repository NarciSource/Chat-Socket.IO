<template>
  <div class="q-pa-md row justify-center">
    <q-card dark bordered class="card">
      <q-card-section class="text-h6">채팅 창</q-card-section>
      <q-separator dark inset />

      <q-scroll-area>
        <q-card-section class="q-px-md">
          <q-chat-message
            v-for="(message, index) in messages"
            :key="index"
            :sent="message.sent"
            :text="message.text"
            :bg-color="message.sent ? 'yellow' : 'white'"
          />
        </q-card-section>
      </q-scroll-area>

      <q-card-section class="row items-end justify-end no-margin q-gutter-x-md bg-white">
        <Submit v-model="messages" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

import Message from "@/entities/Message";
import Submit from "./ui/submit.vue";

const messages = reactive<Message[]>([]);
</script>

<style scoped>
.card {
  background-color: #464647;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
.q-scrollarea {
  height: 500px;
}
</style>
