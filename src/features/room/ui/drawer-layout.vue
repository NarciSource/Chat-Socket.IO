<template>
  <div class="fixed z-max q-px-md row items-center">
    <q-btn class="z-max" flat icon="menu" @click="is_show = !is_show" />

    <div v-show="is_show" class="absolute-center text-h6 text-bold">룸</div>
  </div>

  <q-drawer
    v-model="is_show"
    class="q-py-xl bg-grey-3"
    :width="250"
    show-if-above
    side="left"
    bordered
  >
    <slot />
  </q-drawer>
</template>

<script setup lang="ts">
import { ref } from "vue";

const is_show = ref(true);
</script>

<style scoped>
.fixed {
  width: 250px;
}
</style>
