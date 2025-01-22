<template>
  <div class="q-pa-md row justify-center">
    <q-card dark bordered class="card">
      <q-card-section class="row items-center">
        <search />
        <Title />
        <save />
      </q-card-section>

      <connect>
        <q-scroll-area>
          <q-card-section class="q-px-md">
            <chat-content />
          </q-card-section>
        </q-scroll-area>
      </connect>

      <q-card-section class="row items-end justify-end no-margin q-gutter-x-md bg-white">
        <submit />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { useChatStore } from "./store/chat";
import { Connect, ChatContent, Title, Submit, Search, Save } from "./ui";

const store = useChatStore();
const { connecting, my_nick, opponent_nick } = defineProps({
  connecting: Boolean,
  my_nick: String,
  opponent_nick: String,
});

store.connecting = connecting;
store.my_nick = my_nick!;
store.opponent_nick = opponent_nick || null;
store.room = opponent_nick!;
</script>

<style scoped>
.card {
  background-color: #464647;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
.q-card__section {
  max-width: 300px;
}
.q-scrollarea {
  height: 500px;
}
</style>
