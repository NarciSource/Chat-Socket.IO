<template>
  <q-dialog v-model="dialog_visible" persistent>
    <q-card>
      <q-card-section class="text-h6">수동 등록</q-card-section>
      <q-card-section>
        <q-input v-model="my_nick" label="내 닉네임" />
        <q-btn
          class="q-ma-md full-width"
          label="연결"
          color="teal"
          text-color="white"
          @click="click"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";

const { setup } = defineProps<{ setup: (my_nick: string) => void }>();
const my_nick = ref("");
const dialog_visible = ref(true);

const click = () => {
  setup(my_nick.value);
  dialog_visible.value = false;
};
</script>
