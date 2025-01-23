import { computed, reactive, ref } from "vue";
import { defineStore } from "pinia";

import Message from "@/entities/chat/model/Message";

export const useChatStore = defineStore("chat", () => {
  const connecting = ref(false); // 소켓 연결 여부
  const room_id = ref<string>("");
  const my_nick = ref<string>("");
  const query = ref(""); // 검색어
  const searching = ref(false); // 검색 중 여부

  const message_dictionary = reactive<{ [key: string]: Message[] }>({}); // 전체 메시지 목록
  const messages = // 현재방 메시지 목록
    computed(() => {
      // 방에 메시지가 없으면 빈 배열로 초기화
      message_dictionary[room_id.value] = message_dictionary[room_id.value] || [];
      return message_dictionary[room_id.value];
    });

  // 메시지 삽입 함수
  const insert_message = (message: Message) => {
    // 마지막 메시지
    const last_index = messages.value.length - 1;
    const last_message = messages.value[last_index];

    // 마지막 메시지와 동일한 대상이 보낸 메시지인 경우 이어서 추가
    if (message.name === last_message?.name && !message.is_system) {
      last_message.add_text(message.text[0]);
    } else {
      messages.value.push(message);
    }
  };

  return { connecting, room_id, my_nick, messages, query, searching, insert_message };
});
