import { computed, reactive, ref } from "vue";
import { defineStore } from "pinia";

import { Message, Room } from "@/entities/chat/model";

export default defineStore("chat", () => {
  const connecting = ref(false); // 소켓 연결 여부
  const room = ref<Room>(); // 현재 방 정보
  const room_id = computed(() => room.value!.id);
  const my_nick = ref<string>(""); // 사용자 닉네임
  const query = ref(""); // 검색어
  const searching = ref(false); // 검색 중 여부

  const message_dictionary = reactive<Map<typeof room.value, Message[]>>(new Map()); // 전체 메시지 목록
  const messages = // 현재방 메시지 목록
    computed(() => {
      // 방에 메시지가 없으면 빈 배열로 초기화
      if (!message_dictionary.has(room.value)) {
        message_dictionary.set(room.value, []);
      }
      return message_dictionary.get(room.value)!;
    });

  // 메시지 삽입 함수
  const insert_message = (message: Message) => {
    const last_message = messages.value.at(-1);

    // 마지막 메시지와 동일한 대상이 보낸 메시지인 경우 이어서 추가
    if (message.name === last_message?.name && !message.is_system) {
      last_message.add_text(message.text[0]);
    } else {
      messages.value.push(message);
    }
  };

  return { connecting, room, room_id, my_nick, messages, query, searching, insert_message };
});
