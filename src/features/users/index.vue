<template>
  <q-popup-proxy v-model="show">
    <user-list v-model="selected_users" />

    <div class="q-ma-md row justify-end q-gutter-sm">
      <q-btn label="생성" color="teal" @click="handler" />
      <q-btn label="취소" @click="show = false" />
    </div>
  </q-popup-proxy>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";

import { User } from "@/entities/chat/model";
import { get_users } from "@/entities/chat/service/restService";
import useUsersStore from "./store/useUsersStore";
import userList from "./ui/user-list.vue";

const { onSelected } = defineProps<{
  onSelected: (users: User[]) => void;
}>();
const selected_users = ref<User[]>([]);
const show = ref(false);

const handler = () => {
  onSelected(selected_users.value);

  show.value = false; // 팝업 닫기
};

const { users } = storeToRefs(useUsersStore());

// 접속중인 사용자 목록 초기화
(async () => {
  users.value = await get_users();
})();
</script>
