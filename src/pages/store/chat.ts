import { reactive, ref } from "vue";
import { defineStore } from "pinia";

import Message from "@/entities/Message";

export const useChatStore = defineStore("chat", () => {
  const messages = reactive<Message[]>([]);
  const query = ref("");

  return { messages, query };
});
