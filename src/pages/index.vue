<template>
  <div class="q-pa-md row justify-center">
    <div class="full-width" style="max-width: 400px">
      <div class="text-h6">Chat</div>
      <dv>
        <q-chat-message :text="[text]" sent />
        <q-chat-message :text="[reply]" />
      </dv>

      <div class="row items-end justify-end q-gutter-md">
        <q-input class="w-200" v-model="text" label="Message" />
        <q-btn class="q-mt-md float-right" label="Send" @click="send" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { io, Socket } from "socket.io-client";

const text = ref<string>("");
const reply = ref<string>("");

const socket: Socket = io("http://localhost:3000", {
  transports: ["websocket"],
});

socket.on("reply", (message: string) => {
  reply.value = message;
});

const send = () => socket.emit("message", text.value);
</script>
