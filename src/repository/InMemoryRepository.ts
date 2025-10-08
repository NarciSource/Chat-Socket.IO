/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';

import { Message } from 'src/model/schemaDefinition';
import IRepository from './interface';

@Injectable()
export default class InMemoryRepository implements IRepository {
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

    const rooms = this.userRoomsMap.get(userId);
    if (!rooms) return;

    for (const roomId of rooms) {
      this.roomMembersMap.get(roomId)?.delete(userId);
    }

    this.userRoomsMap.delete(userId);
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

  // (2) userRoomsMap, roomMembersMap 관련
  private ensureUser(userId: string) {
    if (!this.userRoomsMap.has(userId)) {
      this.userRoomsMap.set(userId, new Set());
    }
  }
  private ensureRoom(roomId: string) {
    if (!this.roomMembersMap.has(roomId)) {
      this.roomMembersMap.set(roomId, new Set());
    }
  }

  async getRoomsByUser(userId: string) {
    return [...(this.userRoomsMap.get(userId) ?? [])];
  }

  async getRooms() {
    return [...this.roomMembersMap.keys()];
  }

  async removeRoom(roomId: string) {
    const members = this.roomMembersMap.get(roomId);
    if (!members) return;

    for (const userId of members) {
      this.userRoomsMap.get(userId)?.delete(roomId);
    }

    this.roomMembersMap.delete(roomId);
  }

  async getRoomMembers(roomId: string) {
    return [...(this.roomMembersMap.get(roomId) ?? [])];
  }

  async addRoomToUser(userId: string, roomId: string) {
    this.ensureUser(userId);
    this.ensureRoom(roomId);

    this.userRoomsMap.get(userId)?.add(roomId);
    this.roomMembersMap.get(roomId)?.add(userId);
  }

  async removeRoomToUser(userId: string, roomId: string) {
    this.userRoomsMap.get(userId)?.delete(roomId);
    this.roomMembersMap.get(roomId)?.delete(userId);

    if ((this.roomMembersMap.get(roomId)?.size ?? 0) === 0) {
      this.roomMembersMap.delete(roomId);
    }
  }

  async getMessageHistory(_roomId: string): Promise<Message[]> {
    return [];
  }

  async searchByKeyword(userId: string, keyword: string) {
    return [];
  }
}
