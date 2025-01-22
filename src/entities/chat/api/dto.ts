export type ResponseDTO = {
  senderId: string;
  content: string;
};

export type SendDTO = {
  senderId: string;
  recipientId: string;
  content: string;
};

export type RoomHandshake = {
  myId: string;
  otherId: string;
};
