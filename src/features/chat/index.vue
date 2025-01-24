<template>
  <div class="q-pa-md row justify-center">
    <q-card dark bordered class="card">
      <q-card-section class="row items-center">
        <search />
        <Title />
        <q-btn flat icon="more_vert" class="q-pa-none" @click="open_actions = !open_actions" />
      </q-card-section>

      <q-card-section class="q-pa-none" horizontal>
        <q-card-section class="fit">
          <connect>
            <q-scroll-area>
              <chat-content />
            </q-scroll-area>
          </connect>
        </q-card-section>

        <q-card-actions v-show="open_actions" vertical>
          <actions />
        </q-card-actions>
      </q-card-section>

      <q-card-section class="row items-end justify-end no-margin q-gutter-x-md bg-white">
        <submit />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { Room } from "@/entities/chat/model";
import useChatStore from "./store/useChatStore";
import { Connect, ChatContent, Title, Submit, Search, Actions } from "./ui";
import { ref } from "vue";

const store = useChatStore();
const { connecting, room, my_nick } = defineProps({
  connecting: Boolean,
  room: Room,
  my_nick: String,
});
const open_actions = ref(false);

// store에 props로 업데이트
store.connecting = connecting;
store.room = room!;
store.my_nick = my_nick!;
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
