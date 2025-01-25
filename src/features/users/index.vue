<template>
  <q-popup-proxy v-model="show">
    <user-list v-model="selected_users" />

    <div class="q-ma-md row justify-end q-gutter-sm">
      <q-btn label="생성" color="teal" @click="() => onSelected(selected_users)" />
      <q-btn label="취소" @click="show = false" />
    </div>
  </q-popup-proxy>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";

import { User } from "@/entities/chat/model";
import useUsersStore from "./store/useUsersStore";
import userList from "./ui/user-list.vue";

const { onSelected } = defineProps<{
  onSelected: (users: User[]) => void;
}>();
const selected_users = ref<User[]>([]);
const show = ref(false);

// 임시 사용자 목록 초기화
const { users } = storeToRefs(useUsersStore());
users.value = ["user1", "user2", "user3", "user4", "user5", "user6"].map((user) => new User(user));
</script>
