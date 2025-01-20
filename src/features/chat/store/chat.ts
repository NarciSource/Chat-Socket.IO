import { reactive, ref } from "vue";
import { defineStore } from "pinia";

import Message from "@/entities/chat/model/Message";


export const useChatStore = defineStore("chat", () => {
  const messages = reactive<Message[]>([]);
  const query = ref("");
  const searching = ref(false);
  const connecting = ref(false);

  // 메시지 삽입 함수
  const insert_message = (message: Message) => {
    const last_index = messages.length - 1;

    if (messages[last_index]?.sent === message.sent && !message.is_system) {
      messages[last_index].add_text(message.text[0]);
    } else {
      messages.push(message);
    }
  };

  return { connecting, messages, query, insert_message, searching };
});
