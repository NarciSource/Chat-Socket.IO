import { ref } from "vue";
import { defineStore } from "pinia";

import User from "@/entities/chat/model/User";
import { get_users } from "@/entities/chat/service/restService";

export default defineStore("users", () => {
  const users = ref<User[]>([]);

  const init_users = () => get_users().then((data) => (users.value = data));

  return { users, init_users };
});
