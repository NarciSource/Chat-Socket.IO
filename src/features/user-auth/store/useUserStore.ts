import { defineStore, storeToRefs } from "pinia";

import useGlobalStore from "@/shared/store/useGlobalStore";

export default defineStore("user", () => {
  const { connecting, current_user } = storeToRefs(useGlobalStore());

  return { current_user, connecting };
});
