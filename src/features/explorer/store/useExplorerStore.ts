import { Ref, ref } from "vue";
import { defineStore, storeToRefs } from "pinia";

import { Message, Room } from "@/entities/chat/model";
import useGlobalStore from "@/shared/store/useGlobalStore";

export default defineStore("explorer", () => {
  const { connecting, current_user } = storeToRefs(useGlobalStore());

  const rooms = ref<Map<string, Room>>(new Map([])) as Ref<Map<string, Room>>; // 방 목록
  const search_result = ref<Record<string, Message[]>>({}); // 검색 결과

  return { connecting, current_user, rooms, search_result };
});
