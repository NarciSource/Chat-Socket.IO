import { Injectable } from '@nestjs/common';

import IRepository from './interface';

@Injectable()
export class SimpleRepository implements IRepository {
  /*
   * 1) userId -> socketId
   *    사용자 하나당 현재 연결된 소켓(1개)을 추적
   */
  private userSocketMap: Map<string, string> = new Map();

  /*
   * 2) userId -> set<roomId>
   *    유저가 어떤 방들에 들어가 있는지
   */
  private userRoomsMap: Map<string, Set<string>> = new Map();

  /*
   * 3) roomId -> Set<userId>
   *    어떤 방에 어떤 유저들이 참여 중인지
   */
  private roomMembersMap: Map<string, Set<string>> = new Map();

  // (1) userSocketMap 관련
  async setUserSocket(userId: string, socketId: string) {
    this.userSocketMap.set(userId, socketId);
  }
  async getUserSocketByUserId(userId: string): Promise<string | undefined> {
    return this.userSocketMap.get(userId);
  }
  async hasUserSocket(userId: string): Promise<boolean> {
    return this.userSocketMap.has(userId);
  }
  async removeUserSocket(userId: string) {
    this.userSocketMap.delete(userId);
  }
  async findUserIdBySocketId(socketId: string): Promise<string | undefined> {
    for (const [uId, sId] of this.userSocketMap.entries()) {
      if (sId == socketId) {
        return uId;
      }
    }
    return undefined;
  }
  async getUserKeys(): Promise<string[]> {
    return [...this.userSocketMap.keys()];
  }

  // (2) userRoomsMap 관련
  async initUserRooms(userId: string) {
    this.userRoomsMap.set(userId, new Set());
  }
  async getUserRooms(userId: string): Promise<Set<string>> {
    return this.userRoomsMap.get(userId) || new Set();
  }
  async addRoomToUser(userId: string, roomId: string) {
    const rooms = this.userRoomsMap.get(userId);
    if (rooms) {
      rooms.add(roomId);
    }
  }
  async removeUserRooms(userId: string) {
    this.userRoomsMap.delete(userId);
  }

  async removeAllUserRooms(userId: string): Promise<void> {
    const rooms = this.userRoomsMap.get(userId);
    if (rooms) {
      for (const room of rooms) {
        await this.removeUserFromRoom(room, userId);
      }
    }
  }

  // (3) roomMembersMap 관련
  async createRoom(roomId: string, userIds: string[]) {
    this.roomMembersMap.set(roomId, new Set(userIds));
  }
  async removeRoom(roomId: string) {
    this.roomMembersMap.delete(roomId);
  }
  async getRoomMembers(roomId: string): Promise<Set<string>> {
    return this.roomMembersMap.get(roomId) || new Set();
  }
  async addUserToRoom(roomId: string, userId: string) {
    const members = this.roomMembersMap.get(roomId);
    if (members) {
      members.add(userId);
    }
  }

  async removeUserFromRoom(roomId: string, userId: string): Promise<void> {
    const members = this.roomMembersMap.get(roomId);
    if (members) {
      members.delete(userId);
    }
  }
}
