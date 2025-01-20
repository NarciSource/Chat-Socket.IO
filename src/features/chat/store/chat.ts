import { reactive, ref } from "vue";
import { defineStore } from "pinia";

import Message from "@/entities/chat/model/Message";

export const useChatStore = defineStore("chat", () => {
  // 채팅방 상태
  const connecting = ref(false);
  const my_nick = ref<string>("");
  const opponent_nick = ref<string | null>(null);

  const messages = reactive<Message[]>([]); // 메시지 목록
  const query = ref(""); // 검색어
  const searching = ref(false); // 검색 중 여부

  // 메시지 삽입 함수
  const insert_message = (message: Message) => {
    const last_index = messages.length - 1;

    if (messages[last_index]?.sent === message.sent && !message.is_system) {
      messages[last_index].add_text(message.text[0]);
    } else {
      messages.push(message);
    }
  };

  return { connecting, my_nick, opponent_nick, messages, query, insert_message, searching };
});
