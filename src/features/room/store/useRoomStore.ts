import { ref } from "vue";
import { defineStore } from "pinia";

export default defineStore("room", () => {
  const connecting = ref(false);
  const rooms = ref<string[]>([]);
  const selected_room = ref<string>();
  const my_nick = ref("");

  return { selected_room, rooms, my_nick, connecting };
});
