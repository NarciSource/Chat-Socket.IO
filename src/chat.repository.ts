import { Injectable } from "@nestjs/common";

@Injectable()
export class ChatRepository {
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
    setUserSocket(userId: string, socketId: string) {
        this.userSocketMap.set(userId, socketId);
    }
    getUserSocketByUserId(userId: string): string | undefined {
        return this.userSocketMap.get(userId);
    }
    hasUserSocket(userId: string): boolean {
        return this.userSocketMap.has(userId);
    }
    removeUserSocket(userId: string) {
        this.userSocketMap.delete(userId);
    }
    findUserIdBySocketId(socketId: string): string | undefined {
        for (const [uId, sId] of this.userSocketMap.entries()) {
            if (sId == socketId) {
                return uId;
            }
        }
        return undefined;
    }
    getAllUserSockets(): string[] {
        return Array.from(this.userSocketMap.keys());
    }

    // (2) userRoomsMap 관련
    initUserRooms(userId: string) {
        this.userRoomsMap.set(userId, new Set());
    }
    getUserRooms(userId: string): Set<string> {
        return this.userRoomsMap.get(userId) || new Set();
    }
    removeUserRooms(userId: string) {
        this.userRoomsMap.delete(userId);
    }

    // (3) roomMembersMap 관련
    createRoom(roomId: string, userIds: string[]) {
        this.roomMembersMap.set(roomId, new Set(userIds));
    }
    getRoomMembers(roomId: string): Set<string> {
        return this.roomMembersMap.get(roomId) || new Set();
    }
    removeRoom(roomId: string) {
        this.roomMembersMap.delete(roomId);
    }

    // (4) 기타 조작
    addRoomToUser(userId: string, roomId: string) {
        const rooms = this.userRoomsMap.get(userId);
        if (rooms) {
            rooms.add(roomId);
        }
    }
    addUserToRoom(roomId: string, userId: string) {
        const members = this.roomMembersMap.get(roomId);
        if (members) {
            members.add(userId);
        }
    }
}