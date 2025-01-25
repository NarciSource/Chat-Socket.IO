<template>
  <q-btn flat color="green" icon="add" title="초대하기">
    <q-popup-proxy v-model="show">
      <user-list v-model="selected_users" />

      <div class="q-ma-md row justify-end q-gutter-sm">
        <q-btn label="생성" color="teal" @click="invite" />
        <q-btn label="취소" @click="show = false" />
      </div>
    </q-popup-proxy>
  </q-btn>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";

import userList from "@/features/room/ui/user-list.vue";
import useChatStore from "../store/useChatStore";
import { invite_user } from "../service/event_helper";

const { room_id } = storeToRefs(useChatStore());
const selected_users = ref<string[]>([]);
const show = ref(false);

const invite = () => {
  const last = selected_users.value.pop();
  invite_user(room_id.value, last!);
  // 팝업 닫기
  show.value = false;
};
</script>
