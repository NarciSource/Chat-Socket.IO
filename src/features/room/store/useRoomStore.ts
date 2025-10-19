import { ref, Ref } from "vue";
import { defineStore, storeToRefs } from "pinia";

import { Room } from "@/entities/chat/model";
import useGlobalStore from "@/shared/store/useGlobalStore";

export default defineStore("room", () => {
  const { connecting, current_user } = storeToRefs(useGlobalStore());

  const rooms = ref<Map<string, Room>>(new Map([])) as Ref<Map<string, Room>>; // 방 목록

  return { connecting, rooms, current_user };
});
