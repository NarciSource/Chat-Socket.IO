<template>
  <q-list>
    <q-item class="q-pa-md text-subtitle2 text-weight-bold">참여자 {{ users.length }}명</q-item>

    <q-item
      tag="label"
      v-for="[user, status] in checks_map"
      :active="status.check"
      active-class="bg-teal-2"
    >
      <user-item :user="user" v-model="status.check" />
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";

import { User } from "@/entities/chat/model";
import useUsersStore from "../store/useUsersStore";
import UserItem from "./user-item.vue";

const { users } = storeToRefs(useUsersStore());
// 사용자 목록에 체크박스 바인딩
const checks_map = ref(new Map(users.value.map((user) => [user, { check: false }])));
const selected_users = defineModel<User[]>({ required: true });

// 체크된 사용자를 선택된 사용자로 업데이트
watch(
  () => checks_map.value,
  (checks_map) => {
    selected_users.value = Array.from(checks_map)
      .filter(([, status]) => status.check)
      .map(([user]) => user);
  },
  { deep: true },
);
</script>
