import { defineStore, storeToRefs } from "pinia";

import useGlobalStore from "@/shared/store/useGlobalStore";

export default defineStore("room", () => {
  const { connecting, rooms, current_user, selected_room } = storeToRefs(useGlobalStore());

  return { selected_room, rooms, current_user, connecting };
});
