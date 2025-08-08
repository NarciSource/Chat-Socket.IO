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

    await this.repository.setUserSocket(userId, socketId);

    return true;
  }

  // 유저 해제 로직
  async disconnectUserBySocketId(socketId: string): Promise<void> {
    const userId = await this.repository.findUserIdBySocketId(socketId);

    if (!userId) return;

    // socket map 제거
    await this.repository.removeUserSocket(userId);
  }

  getUsers() {
    return this.repository.getUserKeys();
  }
}
