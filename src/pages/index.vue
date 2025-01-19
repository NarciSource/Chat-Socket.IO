<template>
  <div class="q-pa-md row justify-center">
    <q-card dark bordered class="card">
      <q-card-section class="row items-center">
        <search />
        <div class="q-mx-auto text-h6">채팅 창</div>
      </q-card-section>
      <q-separator dark inset />

      <q-scroll-area>
        <q-card-section class="q-px-md">
          <display />
        </q-card-section>
      </q-scroll-area>

      <q-card-section class="row items-end justify-end no-margin q-gutter-x-md bg-white">
        <submit />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { Display, Submit, Search } from "./ui";
</script>

<style scoped>
.card {
  background-color: #464647;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
.q-scrollarea {
  height: 500px;
}
</style>
