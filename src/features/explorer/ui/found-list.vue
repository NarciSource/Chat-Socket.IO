<template>
  <div>
    <q-list
      v-for="(messages, id) in search_result"
      :key="id"
      class="q-ma-md rounded-borders bg-grey-3 text-black"
      bordered
      dense
      separator
    >
      <!-- 그룹 헤더 -->
      <q-item class="bg-grey-4">
        <q-item-section class="q-py-sm" top avatar>
          <avatar :user="rooms.get(id)?.participants[0]" />
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-bold">
            {{ rooms.get(id)?.name || id }}
          </q-item-label>
        </q-item-section>
      </q-item>

      <!-- 메시지들 -->
      <q-item v-for="(message, index) in messages" :key="index" clickable @click="() => enter(id)">
        <q-item-section>
          <q-item-label>{{ message.text[0] }}</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>{{ message.created_at.toLocaleString() }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

import { Avatar } from "@/shared/components";
import useExplorerStore from "../store/useExplorerStore";

const { search_result, rooms, selected_room } = storeToRefs(useExplorerStore());

const enter = (id: string) => {
  selected_room.value = rooms.value.get(id) ?? null;
};
</script>
