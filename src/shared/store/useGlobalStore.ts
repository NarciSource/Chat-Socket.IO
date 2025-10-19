import { Ref, ref } from "vue";
import { defineStore } from "pinia";

import { Room, User } from "@/entities/chat/model";

type RoomId = string;

export default defineStore("global", () => {
  const connecting = ref(false); // 소켓 연결 여부

  const current_user = ref<User>(); // 현재 사용자

  const rooms = ref<Map<RoomId, Room>>(new Map([])) as Ref<Map<RoomId, Room>>; // 방 목록

  return { connecting, current_user, rooms };
});
