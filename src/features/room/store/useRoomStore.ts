import { ref } from "vue";
import { defineStore } from "pinia";

import Room from "@/entities/chat/model/Room";

export default defineStore("room", () => {
  const connecting = ref(false);
  const rooms = ref<Room[]>([]);
  const selected_room = ref<Room>();
  const my_nick = ref("");

  return { selected_room, rooms, my_nick, connecting };
});
