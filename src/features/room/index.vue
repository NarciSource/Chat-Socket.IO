<template>
  <layout>
    <template #side-header>
      <make-room />
      <q-tooltip v-if="show_tooltip" anchor="top right" @hide="show_tooltip = false">
        접속 중인 사용자를 찾아 채팅을 해보세요.
      </q-tooltip>
    </template>
    <template #side>
      <room-list />
    </template>
  </layout>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { User } from "@/entities/chat/model";
import useRoomStore from "./store/useRoomStore";
import { Layout, MakeRoom, RoomList } from "./ui";

const { connecting, current_user } = defineProps({
  connecting: Boolean,
  current_user: User,
});

const store = useRoomStore();

// store에 props를 업데이트
watch(
  () => ({ connecting, current_user }),
  (props) => {
    store.connecting = props.connecting;
    store.current_user = props.current_user!;
  },
  { immediate: true, deep: true },
);

const show_tooltip = ref(true); // 툴팁 표시 여부
</script>
