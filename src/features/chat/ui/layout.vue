<template>
  <div class="q-pa-md row justify-center">
    <q-card dark bordered class="shadow bg-grey-9">
      <q-card-section class="row items-center">
        <slot name="header" />
        <q-btn
          class="absolute-right q-ma-md q-pa-xs"
          title="더보기"
          flat
          icon="more_vert"
          @click="open_actions = !open_actions"
        />
      </q-card-section>

      <connect>
        <q-card-section horizontal>
          <q-card-section class="fit">
            <q-scroll-area>
              <slot name="content" />
            </q-scroll-area>
          </q-card-section>

          <q-card-actions v-show="open_actions" class="q-pl-none" vertical>
            <slot name="side" />
          </q-card-actions>
        </q-card-section>
      </connect>

      <q-card-section class="row items-end justify-end no-margin q-gutter-x-md bg-white">
        <slot name="footer" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import Connect from "./connect.vue";

const open_actions = ref(false);
</script>

<style scoped>
.shadow {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
.q-card__section {
  max-width: 300px;
}
.q-scrollarea {
  height: 500px;
}
</style>
