<template>
  <q-page class="column bg-grey-9">
    <q-header class="row q-pa-md items-center bg-grey-9">
      <slot name="header" />
      <q-btn
        class="absolute-right q-ma-md q-pa-xs"
        title="더보기"
        flat
        icon="more_vert"
        @click="toggle_toolbar = !toggle_toolbar"
      />
    </q-header>

    <q-drawer
      v-model="toggle_toolbar"
      side="right"
      class="bg-grey-9"
      :width="75"
      :breakpoint="500"
    >
      <slot name="toolbar" />
    </q-drawer>

    <div class="q-pa-md full-height">
      <slot name="content" />
    </div>

    <q-footer>
      <div class="row items-end justify-end no-margin q-pa-md q-gutter-x-md bg-white">
        <slot name="footer" />
      </div>
    </q-footer>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";

const toggle_toolbar = ref(false);
</script>
