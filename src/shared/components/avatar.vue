<template>
  <q-avatar color="teal-1">
    <img v-if="user?.avatar_url" :src="user.avatar_url" />
    <span v-else-if="user?.name">{{ user.name.at(0) }}</span>
    <q-icon v-else name="person" />

    <slot />
  </q-avatar>
</template>

<script setup lang="ts">
defineProps<{
  user:
    | {
        name: string;
        avatar_url?: string;
      }
    | undefined;
}>();
</script>
