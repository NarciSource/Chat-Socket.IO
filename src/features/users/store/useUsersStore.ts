import { ref } from "vue";
import { defineStore } from "pinia";

import User from "@/entities/chat/model/User";

export default defineStore("users", () => {
  const users = ref<User[]>([]);

  return { users };
});
