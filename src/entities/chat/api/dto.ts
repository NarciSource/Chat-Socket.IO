export type ResponseDTO = {
  senderId: string;
  content: string;
};

export type SendDTO = {
  senderId: string;
  recipientId: string;
  content: string;
};

export type CreateRoomPayload = {
  hostId: string; // 방을 생성한 사람 (옵션)
  participants: string[]; // 이 방에 들어갈 유저들의 userId 목록
};

export type LeaveRoomPayload = {
  userId: string;
  roomId: string;
};
