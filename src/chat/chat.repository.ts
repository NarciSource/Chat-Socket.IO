import { Inject, Injectable } from "@nestjs/common";
import { RedisClientType } from 'redis';

@Injectable()
export class ChatRepository {
    constructor(
        @Inject('REDIS_CLIENT')
        private readonly redis: RedisClientType,
    ) {}

    // (1) userSocketMap 관련
    async setUserSocket(userId: string, socketId: string) {
        await this.redis.hSet('userSocketMap', userId, socketId);
    }
    async getUserSocketByUserId(userId: string): Promise<string | undefined> {
        const socketId = await this.redis.hGet('userSocketMap', userId);
        return socketId || undefined;
    }
    async hasUserSocket(userId: string): Promise<boolean> {
        // redis.hExists()가 없으므로, hGet으로 체크
        const socketId = await this.redis.hGet('userSocketMap', userId);
        return !!socketId;
    }
    async removeUserSocket(userId: string): Promise<void> {
        await this.redis.hDel('userSocketMap', userId);
    }
    async findUserIdBySocketId(socketId: string): Promise<string | undefined> {
        // Hash 전체 스캔 (데이터 많으면 비효율적)
        const entries = await this.redis.hGetAll('userSocketMap');
        for (const [uId, sId] of Object.entries(entries)) {
            if (sId == socketId) {
                return uId;
            }
        }
        return undefined;
    }
    async getAllUserSockets(): Promise<string[]> {
        // userId 목록 반환
        const keys = await this.redis.hKeys('userSocketMap');
        return keys;
    }

    // (2) userRoomsMap 관련
    async initUserRooms(userId: string): Promise<void> {
        // 필요 시, 기존 set을 비우고 싶다면 srem or del 등 활용
        // await this.redis.del(`userRoomsMap:${userId}`);
    }
    async getUserRooms(userId: string): Promise<Set<string>> {
        const rooms = await this.redis.sMembers(`userRoomsMap:${userId}`);
        return new Set(rooms);
    }
    async removeUserRooms(userId: string): Promise<void> {
        await this.redis.del(`userRoomsMap:${userId}`);
    }

    // (3) roomMembersMap 관련
    async createRoom(roomId: string, userIds: string[]) {
        if (userIds.length > 0) {
            await this.redis.sAdd(`roomMembersMap:${roomId}`, userIds);
        }
    }
    async getRoomMembers(roomId: string): Promise<Set<string>> {
        const members = await this.redis.sMembers(`roomMembersMap:${roomId}`);
        return new Set(members);
    }
    async removeRoom(roomId: string) {
        await this.redis.del(`roomMembersMap:${roomId}`);
    }

    // (4) 기타 조작
    async addRoomToUser(userId: string, roomId: string): Promise<void> {
        await this.redis.del(`userRoomsMap:${userId}`);
    }
    async addUserToRoom(roomId: string, userId: string) {
        await this.redis.sAdd(`roomMembersMap:${roomId}`, userId);
    }
    async removeUserFromRoomInRedis(roomId: string, userId: string): Promise<void> {
        await this.redis.sRem(`roomMembersMap:${roomId}`, userId);
    }
}