export type ResponsePayload = {
  senderId: string;
  content: string;
};

export type SendPayload = {
  roomId: string; // 메시지를 전송할 방
  senderId: string; // 보낸 사람
  content: string; // 메시지 내용
};

export type CreateRoomPayload = {
  hostId: string; // 방을 생성한 사람 (옵션)
  participants: string[]; // 이 방에 들어갈 유저들의 userId 목록
};

export type LeaveRoomPayload = {
  userId: string;
  roomId: string;
};

export type RoomCreatedPayload = {
  roomId: string;
  participants: string[];
};
