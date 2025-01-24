import { ref } from "vue";
import { defineStore } from "pinia";

import Room from "@/entities/chat/model/Room";

export default defineStore("room", () => {
  const connecting = ref(false);
  const rooms = ref<Set<Room>>(new Set([]));
  const selected_room = ref<Room | null>(null);
  const my_nick = ref("");

  return { selected_room, rooms, my_nick, connecting };
});
