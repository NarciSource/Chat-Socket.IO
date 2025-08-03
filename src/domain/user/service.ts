import { Injectable, Inject } from '@nestjs/common';

import IRepository from 'src/repository/interface';

@Injectable()
export class UserService {
  constructor(
    @Inject('IRepository')
    private readonly repository: IRepository,
  ) {}

  // 등록 로직
  async registerUser(userId: string, socketId: string): Promise<boolean> {
    const has = await this.repository.hasUserSocket(userId);

    if (has) {
      return false; // 중복
    }

    this.repository.setUserSocket(userId, socketId);

    await this.repository.initUserRooms(userId);

    return true;
  }

  // 유저 해제 로직
  async disconnectUserBySocketId(socketId: string): Promise<void> {
    const userId = await this.repository.findUserIdBySocketId(socketId);

    if (!userId) return;

    // socket map 제거
    await this.repository.removeUserSocket(userId);

    // rooms
    const rooms = await this.repository.getUserRooms(userId);

    await this.repository.removeAllUserRooms(userId);

    // roomMembersMap에서 해당 유저 제거
    for (const roomId of rooms) {
      // Redis에서 roomMembers 갱신
      const members = await this.repository.getRoomMembers(roomId);

      members.delete(userId);

      if (members.size === 0) {
        await this.repository.removeRoom(roomId);

        console.log(`방 ${roomId}가 비어 삭제됨`);
      } else {
        // 실제 Redis에 반영
        await this.repository.removeUserFromRoom(roomId, userId);
      }
    }
  }

  getUsers() {
    return this.repository.getUserKeys();
  }
}
