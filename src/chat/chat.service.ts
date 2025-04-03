import { Inject, Injectable } from '@nestjs/common';

import IRepository from './repository.interface';

/*
 * 방 생성/입장/퇴장 등 비즈니스 로직 담당
 * - Gateway(ChatGateway)에서 호출하여 사용
 */
@Injectable()
export class ChatService {
  constructor(
    @Inject('IRepository')
    private readonly chatRepository: IRepository,
  ) {}

  // 등록 로직
  async registerUser(userId: string, socketId: string): Promise<boolean> {
    const has = await this.chatRepository.hasUserSocket(userId);
    if (has) {
      return false; // 중복
    }
    await this.chatRepository.setUserSocket(userId, socketId);
    await this.chatRepository.initUserRooms(userId);
    return true;
  }

  // 유저 해제 로직
  async disconnectUserBySocketId(socketId: string): Promise<void> {
    const userId = await this.chatRepository.findUserIdBySocketId(socketId);
    if (!userId) return;

    // socket map 제거
    await this.chatRepository.removeUserSocket(userId);

    // rooms
    const rooms = await this.chatRepository.getUserRooms(userId);
    await this.chatRepository.removeAllUserRooms(userId);

    // roomMembersMap에서 해당 유저 제거
    for (const roomId of rooms) {
      // Redis에서 roomMembers 갱신
      const members = await this.chatRepository.getRoomMembers(roomId);
      members.delete(userId);

      if (members.size === 0) {
        await this.chatRepository.removeRoom(roomId);
        console.log(`방 ${roomId}가 비어 삭제됨`);
      } else {
        // 실제 Redis에 반영
        await this.chatRepository.removeUserFromRoom(roomId, userId);
      }
    }
  }

  // 랜덤 roomId
  generateRandomRoomId(): string {
    return Math.random().toString(36).substring(2, 8);
  }

  // 방 생성
  async createRoom(
    hostId: string,
    participants: string[],
  ): Promise<{ roomId: string; allParticipants: string[] }> {
    const roomId = this.generateRandomRoomId();
    const all = [...participants, hostId];
    await this.chatRepository.createRoom(roomId, participants);

    for (const userId of all) {
      await this.chatRepository.addRoomToUser(userId, roomId);
    }

    return { roomId, allParticipants: all };
  }

  // 방 join
  async joinRoom(
    userId: string,
    roomId: string,
  ): Promise<{ success: boolean; participants?: string[] }> {
    const members = await this.chatRepository.getRoomMembers(roomId);
    if (!members) {
      return { success: false };
    }
    members.add(userId);

    // userRoomsMap도 업데이트
    await this.chatRepository.addRoomToUser(userId, roomId);
    await this.chatRepository.addRoomToUser(userId, roomId);

    return { success: true, participants: Array.from(members) };
  }

  // 방 떠나기
  async leaveRoom(userId: string, roomId: string): Promise<boolean> {
    const members = await this.chatRepository.getRoomMembers(roomId);
    if (!members) {
      return false;
    }
    members.delete(userId);
    // DB 동기화
    await this.chatRepository.removeUserFromRoom(roomId, userId);

    if (members.size === 0) {
      this.chatRepository.removeRoom(roomId);
      console.log(`모두 떠나서 방 ${roomId} 삭제`);
    }

    const rooms = await this.chatRepository.getUserRooms(userId);
    rooms.delete(roomId);
    await this.chatRepository.removeUserRooms(userId, roomId);
    return true;
  }

  // userId로 소켓 찾기
  async getSocketId(userId: string): Promise<string | undefined> {
    return this.chatRepository.getUserSocketByUserId(userId);
  }
}
