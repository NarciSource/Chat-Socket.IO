import { Ref, ref } from "vue";
import { defineStore } from "pinia";

import { Room, User } from "@/entities/chat/model";

type RoomId = string;

export default defineStore("global", () => {
  const connecting = ref(false); // 소켓 연결 여부

  const current_user = ref<User>(); // 현재 사용자

  const rooms = ref<Map<RoomId, Room>>(new Map([])) as Ref<Map<RoomId, Room>>; // 방 목록

  const selected_room = ref<Room | null>(null) as Ref<Room | null>; // 현재 선택된 방

  return { connecting, current_user, rooms, selected_room };
});
