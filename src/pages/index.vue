<template>
  <div class="q-pa-md row justify-center">
    <q-card dark bordered class="card">
      <q-card-section class="text-h6">채팅 창</q-card-section>
      <q-separator dark inset />

      <q-card-section>
        <q-chat-message :text="[send_message]" sent bg-color="yellow" />
        <q-chat-message :text="[reply_message]" bg-color="white" />
      </q-card-section>

      <q-card-section class="row items-end justify-end no-margin q-gutter-x-md bg-white">
        <q-input class="w-200" v-model="send_message" label="Message" @keyup.enter="send" />
        <q-btn
          class="q-mt-md float-right"
          color="yellow"
          text-color="black"
          label="Send"
          @click="send"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { io, Socket } from "socket.io-client";

const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_SERVER_URL;
const SOCKET_EVENT_MESSAGE = import.meta.env.VITE_SOCKET_EVENT_MESSAGE;
const SOCKET_EVENT_RESPONSE = import.meta.env.VITE_SOCKET_EVENT_RESPONSE;

const send_message = ref<string>("입력해주세요");
const reply_message = ref<string>("응답 대기");

const socket: Socket = io(SOCKET_SERVER_URL, {
  transports: ["websocket"],
});

socket.on(SOCKET_EVENT_RESPONSE, (message: string) => {
  reply_message.value = message;
});

const send = () => socket.emit(SOCKET_EVENT_MESSAGE, send_message.value);
</script>

<style scoped>
.card {
  background-color: #464647;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
</style>
