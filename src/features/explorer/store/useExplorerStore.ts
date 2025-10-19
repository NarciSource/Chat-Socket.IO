import { defineStore, storeToRefs } from "pinia";
import { ref } from "vue";

import { Message } from "@/entities/chat/model";
import useGlobalStore from "@/shared/store/useGlobalStore";

export default defineStore("explorer", () => {
  const { connecting, current_user, rooms, selected_room } = storeToRefs(useGlobalStore());

  const search_result = ref<Record<string, Message[]>>({}); // 검색 결과

  return { connecting, current_user, rooms, selected_room, search_result };
});
