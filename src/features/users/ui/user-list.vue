<template>
  <q-item
    tag="label"
    v-for="[user, status] in checks_map"
    :active="status.check"
    active-class="bg-teal-2"
  >
    <q-item-section side v-show="false">
      <q-checkbox v-model="status.check" />
    </q-item-section>

    <q-item-section avatar>
      <q-avatar>
        <img :src="user.avatar_url" />
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ user.name }}</q-item-label>
    </q-item-section>

    <q-item-section side>
      <q-badge rounded color="green" />
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

import { User } from "@/entities/chat/model";
import useUsersStore from "../store/useUsersStore";

const selected_users = defineModel<User[]>({ required: true });
const { users } = useUsersStore();
// 사용자 목록에 체크박스 바인딩
const checks_map = ref(
  new Map<User, { check: boolean }>(users.map((user) => [user, { check: false }])),
);

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
