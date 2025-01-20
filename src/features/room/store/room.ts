import { ref } from "vue";
import { defineStore } from "pinia";

export const useRoomStore = defineStore("room", () => {
  const my_nick = ref("");
  const opponent_nick = ref("");

  return { my_nick, opponent_nick };
});
