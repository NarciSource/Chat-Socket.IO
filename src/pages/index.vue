<template>
  <div class="q-pa-md row justify-center">
    <q-card dark bordered class="card">
      <q-card-section class="text-h6">채팅 창</q-card-section>
      <q-separator dark inset />

      <q-card-section>
        <q-chat-message
          v-for="(message, index) in messages"
          :key="index"
          :sent="message.sent"
          :text="message.text"
          :bg-color="message.sent ? 'yellow' : 'white'"
        />
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
import { reactive, ref } from "vue";
import { io, Socket } from "socket.io-client";

const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_SERVER_URL;
const SOCKET_EVENT_MESSAGE = import.meta.env.VITE_SOCKET_EVENT_MESSAGE;
const SOCKET_EVENT_RESPONSE = import.meta.env.VITE_SOCKET_EVENT_RESPONSE;

interface Message {
  text: string[];
  sent: boolean;
}

const messages = reactive<Message[]>([]);
const send_message = ref("입력해주세요");

const socket: Socket = io(SOCKET_SERVER_URL, {
  transports: ["websocket"],
});

socket.on(SOCKET_EVENT_RESPONSE, (text: string) => {
  messages.push({ text: [text], sent: false });
});

const send = () => {
  socket.emit(SOCKET_EVENT_MESSAGE, send_message.value);

  messages.push({ text: [send_message.value], sent: true });
};
</script>

<style scoped>
.card {
  background-color: #464647;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
</style>
