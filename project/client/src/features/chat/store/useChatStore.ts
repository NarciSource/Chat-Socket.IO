import { computed, reactive, ref } from "vue";
import { defineStore } from "pinia";

import { Message, Room, User } from "@/entities/chat/model";

export default defineStore("chat", () => {
  const connecting = ref(false); // 소켓 연결 여부
  const room = ref<Room>(); // 현재 방 정보
  const current_user = ref<User>(); // 사용자
  const query = ref(""); // 검색어
  const searching = ref(false); // 검색 중 여부
  const typing_user = ref<User | null>(null); // 타이핑 중인 사용자

  const message_dictionary = reactive<Map<string | undefined, Message[]>>(new Map()); // 전체 메시지 목록
  const messages = // 현재방 메시지 목록
    computed(() => {
      // 방에 메시지가 없으면 빈 배열로 초기화
      if (!message_dictionary.has(room.value?.id)) {
        message_dictionary.set(room.value?.id, []);
      }
      return message_dictionary.get(room.value?.id)!;
    });

  // 메시지 삽입 함수
  const insert_message = ([message, roomId]: [Message, string]) => {
    const messages = message_dictionary.get(roomId)!;
    const last_message = messages.at(-1);

    // 마지막 메시지와 동일한 대상이 보낸 메시지인 경우 이어서 추가
    if (last_message && message.name === last_message?.name && !message.is_system) {
      last_message.add_text(message.text[0]);
    } else {
      messages.push(message);
    }
  };

  let iv: NodeJS.Timeout;
  const alarm_typing = (user_name: string) => {
    // 타이핑 중인 사용자 정보를 찾아서 저장
    typing_user.value =
      room.value?.participants
        .filter((user) => user.name !== current_user.value?.name)
        .find((user) => user.name === user_name) || null;
    // 2초 후 타이핑 중인 사용자 정보 삭제
    clearTimeout(iv);
    iv = setTimeout(() => (typing_user.value = null), 2000);
  };

  // 기존 메시지 목록에 새로 수신된 메시지를 병합하여 최신 상태로 갱신
  const update_messages = ({
    roomId,
    incoming_messages,
  }: {
    roomId: string;
    incoming_messages: Message[];
  }) => {
    const old_messages = message_dictionary.get(roomId) ?? [];
    const last_created_at = old_messages.at(-1)?.created_at ?? 0;

    const new_messages = incoming_messages.filter((item) => item.created_at > last_created_at);

    message_dictionary.set(roomId, [...old_messages, ...new_messages]);
  };

  return {
    connecting,
    room,
    current_user,
    messages,
    query,
    searching,
    typing_user,
    insert_message,
    alarm_typing,
    update_messages,
  };
});
