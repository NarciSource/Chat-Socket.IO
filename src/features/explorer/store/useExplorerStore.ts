import { defineStore } from "pinia";
import { Ref, ref } from "vue";

import { Message, Room, User } from "@/entities/chat/model";

export default defineStore("explorer", () => {
  const connecting = ref(false); // 소켓 연결 여부
  const current_user = ref<User>(); // 사용자
  const rooms = ref<Map<string, Room>>(new Map([])) as Ref<Map<string, Room>>; // 방 목록
  const selected_room = ref<Room | null>(null) as Ref<Room | null>; // 현재 선택된 방
  const search_result = ref<Record<string, Message[]>>({}); // 검색 결과

  return { connecting, current_user, rooms, selected_room, search_result };
});
