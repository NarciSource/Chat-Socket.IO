<template>
  <div class="fit">
    <q-layout view="hHh Lpr lff" container class="shadow-2 rounded-borders">
      <q-drawer
        v-model="drawer"
        show-if-above
        :mini="!drawer || miniState"
        @click.capture="drawerClick"
        :width="200"
        :breakpoint="500"
        bordered
        class="bg-grey-3"
      >
        <slot name="side" />

        <div class="absolute" style="top: 15px; right: -17px">
          <q-btn
            dense
            round
            unelevated
            color="accent"
            icon="chevron_left"
            @click="miniState = true"
          />
        </div>
      </q-drawer>

      <q-page-container>
        <slot name="content" />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const drawer = ref(false);
const miniState = ref(false);

const drawerClick = (e: Event) => {
  if (miniState.value) {
    miniState.value = false;
    e.stopPropagation();
  }
};
</script>
