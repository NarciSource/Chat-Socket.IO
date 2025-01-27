import { Ref, ref } from "vue";
import { defineStore } from "pinia";

import { Room, User } from "@/entities/chat/model";

export default defineStore("room", () => {
  const connecting = ref(false); // 소켓 연결 여부
  const rooms = ref<Map<string, Room>>(new Map([])) as Ref<Map<string, Room>>; // 방 목록
  const selected_room = ref<Room | null>(null) as Ref<Room | null>; // 현재 선택된 방
  const current_user = ref<User>(); // 사용자

  return { selected_room, rooms, current_user, connecting };
});
