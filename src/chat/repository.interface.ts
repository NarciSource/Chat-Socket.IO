export default interface IRepository {
  setUserSocket(userId: string, socketId: string): void; // userId에 해당하는 소켓 ID 등록
  getUserSocketByUserId(userId: string): Promise<string | undefined>; // userId에 해당하는 소켓 ID를 가져옴
  hasUserSocket(userId: string): Promise<boolean>; // userId에 해당하는 소켓 ID가 존재하는지 확인
  removeUserSocket(userId: string): Promise<void>; // userId에 해당하는 소켓 ID 삭제
  findUserIdBySocketId(socketId: string): Promise<string | undefined>; // socketId에 해당하는 userId를 가져옴
  getUserKeys(): Promise<string[]>; // 모든 유저의 userId 목록을 가져옴
  initUserRooms(userId: string): Promise<void>; // 유저의 방 목록 초기화
  getUserRooms(userId: string): Promise<Set<string>>; // userId에 해당하는 방 목록을 가져옴
  removeUserRooms(userId: string, roomId: string): Promise<void>; // userId에 해당하는 방 삭제
  removeAllUserRooms(userId: string): Promise<void>; // userId에 해당하는 모든 방 삭제
  createRoom(roomId: string, userIds: string[]): Promise<void>; // 방 생성 (roomId, userIds)
  getRoomMembers(roomId: string): Promise<Set<string>>; // 방에 속한 유저 목록을 가져옴
  removeRoom(roomId: string): Promise<void>; // 방 삭제 (roomId)
  addRoomToUser(userId: string, roomId: string): Promise<void>; // 유저에 방 추가 (userId, roomId)
  addUserToRoom(roomId: string, userId: string): Promise<void>; // 방에 유저 추가 (roomId, userId)
  removeUserFromRoomInRedis(roomId: string, userId: string): Promise<void>; // 방에서 유저 삭제 (roomId, userId)
}
