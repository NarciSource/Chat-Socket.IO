import { ref } from "vue";
import { defineStore } from "pinia";

export const useRoomStore = defineStore("room", () => {
  const connecting = ref(false);
  const room_id = ref<string>();
  const my_nick = ref("");

  return { room_id, my_nick, connecting };
});
