import { defineStore, storeToRefs } from "pinia";

import useGlobalStore from "@/shared/store/useGlobalStore";

export default defineStore("room", () => {
  const { connecting, rooms, current_user } = storeToRefs(useGlobalStore());

  return { connecting, rooms, current_user };
});
