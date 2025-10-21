import Message from 'src/model/Message';

export default interface IRepository {
  setUserSocket(userId: string, socketId: string): Promise<void>; // userId에 해당하는 소켓 ID 등록
  getUserSocketByUserId(userId: string): Promise<string | undefined>; // userId에 해당하는 소켓 ID를 가져옴
  hasUserSocket(userId: string): Promise<boolean>; // userId에 해당하는 소켓 ID가 존재하는지 확인
  removeUserSocket(userId: string): Promise<void>; // userId에 해당하는 소켓 ID 삭제
  findUserIdBySocketId(socketId: string): Promise<string | undefined>; // socketId에 해당하는 userId를 가져옴
  getUserKeys(): Promise<string[]>; // 모든 유저의 userId 목록을 가져옴

  getRoomsByUser(userId: string): Promise<string[]>; // 특정 유저가 속한 방 목록을 가져옴
  getRooms(): Promise<string[]>; // 전체 방 목록을 가져옴
  removeRoom(roomId: string): Promise<void>; // 방 삭제
  getRoomMembers(roomId: string): Promise<string[]>; // 방의 멤버 목록을 가져옴
  addRoomToUser(roomId: string, userId: string): Promise<void>; // 방에 유저 추가
  removeRoomToUser(userId: string, roomId: string): Promise<void>; // 방에서 유저 제거

  getMessageHistory(roomId: string): Promise<Message[]>; // 메시지 기록 불러오기
  searchByKeyword(roomIds: string[], keyword: string): Promise<Message[]>; //메시지 키워드 검색
}
