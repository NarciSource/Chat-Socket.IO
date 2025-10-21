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
      <q-item
        v-for="(message, index) in messages"
        :key="index"
        :to="`room/${id}`"
        clickable
        @click="(e) => (e.preventDefault(), enter(rooms.get(id)!))"
      >
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
import { HistoryState, useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import { Room } from "@/entities/chat/model";
import { RouterName } from "@/shared/constants";
import { Avatar } from "@/shared/components";
import useExplorerStore from "../store/useExplorerStore";

const router = useRouter();
const { search_result, rooms } = storeToRefs(useExplorerStore());

const enter = (room: Room) => {
  room.is_new = false; // 새로운 방 표시 해제

  router.push({
    name: RouterName.Room,
    params: { id: room.id },
    state: { room } as unknown as HistoryState,
  }); // 방 이동 및 방 상태 전달
};
</script>
