<template>
  <q-item-section v-show="false" side>
    <q-checkbox v-model="check" />
  </q-item-section>

  <q-item-section avatar>
    <avatar :user="user" />
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
import { Avatar } from "@/shared/components";

const { user } = defineProps<{ user: User }>();
const check = defineModel<boolean>();
</script>
