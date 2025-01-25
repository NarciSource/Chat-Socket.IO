<template>
  <q-item tag="label" v-for="(user, id) in users" :active="checks[id]" active-class="bg-teal-2">
    <q-item-section side v-show="false">
      <q-checkbox v-model="checks[id]" />
    </q-item-section>

    <q-item-section avatar>
      <q-avatar>
        <img :src="`https://cdn.quasar.dev/img/avatar${id + 1}.jpg`" />
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ user }}</q-item-label>
    </q-item-section>

    <q-item-section side>
      <q-badge rounded color="green" />
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";

import useUsersStore from "../store/useUsersStore";

const { users } = storeToRefs(useUsersStore());

const checks = ref(Object.fromEntries(users.value.map((user) => [user, false])));
const selected_users = defineModel<string[]>({ required: true });

// 체크박스 상태에 따라 선택된 사용자 목록 업데이트
watch(
  () => checks.value,
  (checks) => {
    selected_users.value = Object.entries(checks)
      .filter(([, checked]) => checked)
      .map(([user]) => user);
  },
  { deep: true },
);
</script>
