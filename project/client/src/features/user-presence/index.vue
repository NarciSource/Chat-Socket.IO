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
import useUsersStore from "./store/useUsersStore";
import { get_users } from "./service/event_helper";
import { UserList } from "./ui";

const { users } = storeToRefs(useUsersStore());
type OnSelected = (users: User[]) => void;
const { onSelected } = defineProps<{ onSelected: OnSelected }>();
const selected_users = ref<User[]>([]); // 선택된 사용자 목록
const show = ref(false); // 팝업 표시 여부

const handler = () => {
  onSelected(selected_users.value); // 선택된 사용자 목록 전달
  show.value = false; // 팝업 닫기
};

get_users((updated_users: User[]) => {
  users.value = updated_users; // 접속중인 사용자 목록
});
</script>
