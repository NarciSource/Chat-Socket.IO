import { reactive, ref } from "vue";
import { defineStore } from "pinia";

import Message from "@/entities/chat/model/Message";

export const useChatStore = defineStore("chat", () => {
  const connecting = ref(false); // 소켓 연결 여부
  const room_id = ref<string>("");
  const my_nick = ref<string>("");
  const messages = reactive<{ [key: string]: Message[] }>({}); // 전체 메시지 목록
  const query = ref(""); // 검색어
  const searching = ref(false); // 검색 중 여부

  // 메시지 삽입 함수
  const insert_message = (message: Message) => {
    // 방에 메시지가 없으면 빈 배열로 초기화
    if (!messages[room_id.value]) {
      messages[room_id.value] = [];
    }

    // 마지막 메시지 인덱스
    const last_index = messages[room_id.value].length - 1;

    // 마지막 메시지와 동일한 대상이 보낸 메시지인 경우 이어서 추가
    if (messages[room_id.value][last_index]?.name === message.name && !message.is_system) {
      messages[room_id.value][last_index].add_text(message.text[0]);
    } else {
      messages[room_id.value].push(message);
    }
  };

  return { connecting, room_id, my_nick, messages, query, searching, insert_message };
});
