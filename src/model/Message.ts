export default interface Message {
  userId: string;
  roomId: string;
  content: string;
  createdAt: Date;
}
