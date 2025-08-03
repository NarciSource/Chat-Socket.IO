import { Inject, Injectable } from '@nestjs/common';

import IRepository from 'src/repository/interface';

@Injectable()
export class RoomService {
  constructor(
    @Inject('IRepository')
    private readonly repository: IRepository,
  ) {}

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

    await this.repository.createRoom(roomId, participants);

    for (const userId of all) {
      await this.repository.addRoomToUser(userId, roomId);
    }

    return { roomId, allParticipants: all };
  }

  // 방 join
  async joinRoom(
    userId: string,
    roomId: string,
  ): Promise<{ success: boolean; participants?: string[] }> {
    const members = await this.repository.getRoomMembers(roomId);

    if (!members) {
      return { success: false };
    }
    members.add(userId);

    // userRoomsMap도 업데이트
    await this.repository.addRoomToUser(userId, roomId);
    await this.repository.addRoomToUser(userId, roomId);

    return { success: true, participants: Array.from(members) };
  }

  // 방 떠나기
  async leaveRoom(userId: string, roomId: string): Promise<boolean> {
    const members = await this.repository.getRoomMembers(roomId);

    if (!members) {
      return false;
    }
    members.delete(userId);

    // DB 동기화
    await this.repository.removeUserFromRoom(roomId, userId);

    if (members.size === 0) {
      await this.repository.removeRoom(roomId);
      console.log(`모두 떠나서 방 ${roomId} 삭제`);
    }

    const rooms = await this.repository.getUserRooms(userId);
    rooms.delete(roomId);

    await this.repository.removeUserRooms(userId, roomId);
    return true;
  }

  // userId로 소켓 찾기
  async getSocketId(userId: string): Promise<string | undefined> {
    return this.repository.getUserSocketByUserId(userId);
  }
}
