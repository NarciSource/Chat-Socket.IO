import { ref } from "vue";
import { defineStore } from "pinia";

export const useRoomStore = defineStore("room", () => {
  const my_nick = ref("");
  const opponent_nick = ref("");
  const connecting = ref(false);
  const room_id = ref<string>();

  return { my_nick, opponent_nick, connecting, room_id };
});
