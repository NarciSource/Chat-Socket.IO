import Redis from 'ioredis';
import { Inject, Injectable } from '@nestjs/common';

import IRepository from './interface';

@Injectable()
export default class RedisRepository implements IRepository {
  constructor(
    @Inject('REDIS_CLIENT')
    private readonly redis: Redis,
  ) {}

  // (1) userSocketMap 관련
  async setUserSocket(userId: string, socketId: string) {
    await this.redis.hset('userSocketMap', userId, socketId);
  }

  async getUserSocketByUserId(userId: string): Promise<string | undefined> {
    const socketId = await this.redis.hget('userSocketMap', userId);
    return socketId || undefined;
  }

  async hasUserSocket(userId: string): Promise<boolean> {
    // redis.hExists()가 없으므로, hget으로 체크
    const socketId = await this.redis.hget('userSocketMap', userId);
    return !!socketId;
  }

  async removeUserSocket(userId: string): Promise<void> {
    await this.redis.hdel('userSocketMap', userId);

    const userKey = this.userKey(userId);
    const rooms = await this.redis.smembers(userKey);

    for (const roomId of rooms) {
      await this.redis.srem(this.roomKey(roomId), userId);
    }

    await this.redis.del(userKey);
  }

  async findUserIdBySocketId(socketId: string): Promise<string | undefined> {
    // Hash 전체 스캔 (데이터 많으면 비효율적)
    const entries = await this.redis.hgetall('userSocketMap');
    for (const [uId, sId] of Object.entries(entries)) {
      if (sId == socketId) {
        return uId;
      }
    }
    return undefined;
  }

  async getUserKeys(): Promise<string[]> {
    return this.redis.hkeys('userSocketMap');
  }

  // key helpers
  private userKey(userId: string) {
    return `user:${userId}:rooms`;
  }

  private roomKey(roomId: string) {
    return `room:${roomId}:users`;
  }

  // (2) userRoomsMap, roomMembersMap 관련
  async getRoomsByUser(userId: string) {
    return this.redis.smembers(this.userKey(userId));
  }

  async getRooms() {
    const keys = await this.scanKeys('room:*:users');

    return keys.map((k) => k.split(':')[1]);
  }

  async removeRoom(roomId: string) {
    const roomKey = this.roomKey(roomId);
    const members = await this.redis.smembers(roomKey);
    {
      const multi = this.redis.multi();
      for (const userId of members) {
        multi.srem(this.userKey(userId), roomId);
      }
      multi.del(roomKey);

      await multi.exec();
    }
  }

  async getRoomMembers(roomId: string) {
    return await this.redis.smembers(this.roomKey(roomId));
  }

  async addRoomToUser(userId: string, roomId: string) {
    const userKey = this.userKey(userId);
    const roomKey = this.roomKey(roomId);
    {
      const multi = this.redis.multi();
      multi.sadd(userKey, roomId);
      multi.sadd(roomKey, userId);

      await multi.exec();
    }
  }

  async removeRoomToUser(userId: string, roomId: string) {
    const userKey = this.userKey(userId);
    const roomKey = this.roomKey(roomId);
    {
      const multi = this.redis.multi();
      multi.srem(userKey, roomId);
      multi.srem(roomKey, userId);

      if ((await this.redis.scard(roomKey)) === 1) {
        multi.del(roomKey);
      }

      await multi.exec();
    }
  }

  // Redis SCAN helper
  private async scanKeys(pattern: string): Promise<string[]> {
    const keys: string[] = [];
    let cursor = '0';

    do {
      const [nextCursor, batch] = await this.redis.scan(cursor, 'MATCH', pattern, 'COUNT', 100);
      keys.push(...batch);

      cursor = nextCursor;
    } while (cursor !== '0');

    return keys;
  }
}
