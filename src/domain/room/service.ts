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
  ): Promise<{ roomId: string; participants: string[] }> {
    const roomId = this.generateRandomRoomId();
    const members = [...participants, hostId];

    for (const userId of members) {
      await this.repository.addRoomToUser(userId, roomId);
    }

    return { roomId, participants: members };
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

    await this.repository.addRoomToUser(userId, roomId);

    return { success: true, participants: members };
  }

  // 방 떠나기
  async leaveRoom(userId: string, roomId: string): Promise<boolean> {
    const members = await this.repository.getRoomMembers(roomId);

    if (!members) {
      return false;
    }

    await this.repository.removeRoomToUser(userId, roomId);
    return true;
  }

  // userId로 소켓 찾기
  async getSocketId(userId: string): Promise<string | undefined> {
    return this.repository.getUserSocketByUserId(userId);
  }
}
