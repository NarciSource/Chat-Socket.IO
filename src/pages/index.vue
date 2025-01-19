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
        <q-input class="w-200" v-model="send_message" label="메시지 입력" @keyup.enter="send" />
        <q-btn
          class="q-mt-md float-right"
          color="yellow"
          text-color="black"
          label="전송"
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
const send_message = ref();

const socket: Socket = io(SOCKET_SERVER_URL, {
  transports: ["websocket"],
});

const insert_message = (message: string, sent: boolean) => {
  if (messages.length > 0 && messages[messages.length - 1].sent === sent) {
    messages[messages.length - 1].text.push(message);
  } else {
    messages.push({ text: [message], sent });
  }
};

socket.on(SOCKET_EVENT_RESPONSE, (response: string) => {
  insert_message(response, false);
});

const send = () => {
  socket.emit(SOCKET_EVENT_MESSAGE, send_message.value);

  insert_message(send_message.value, true);
};
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
