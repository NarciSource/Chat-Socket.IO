import { Ref, ref } from "vue";
import { defineStore } from "pinia";

import { Room, User } from "@/entities/chat/model";

export default defineStore("room", () => {
  const connecting = ref(false);
  const rooms = ref<Set<Room>>(new Set([])) as Ref<Set<Room>>;
  const selected_room = ref<Room | null>(null);
  const current_user = ref<User>();

  return { selected_room, rooms, current_user, connecting };
});
