import { ref } from "vue";
import { defineStore } from "pinia";

import { User } from "@/entities/chat/model";

export default defineStore("user", () => {
  const connecting = ref(false); // 소켓 연결 여부
  const current_user = ref<User>(); // 사용자

  return { current_user, connecting };
});
