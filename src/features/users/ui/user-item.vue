<template>
  <q-item-section side v-show="false">
    <q-checkbox v-model="check" />
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
</template>

<script setup lang="ts">
import { User } from "@/entities/chat/model";

const { user } = defineProps<{ user: User }>();
const check = defineModel<boolean>();
</script>
