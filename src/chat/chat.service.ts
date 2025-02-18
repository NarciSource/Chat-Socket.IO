import { Injectable } from "@nestjs/common";
import { ChatRepository } from "./chat.repository";

/*
 * 방 생성/입장/퇴장 등 비즈니스 로직 담당
 * - Gateway(ChatGateway)에서 호출하여 사용
 */
@Injectable()
export class ChatService {
    // 1) userId -> socketId
    private userSocketMap: Map<string, string> = new Map();

    // 2) userId -> Set<roomId>
    private userRoomsMap: Map<string, Set<string>> = new Map();

    // 3) roomId -> Set<userId>
    private roomMembersMap: Map<string, Set<string>> = new Map();

    // 등록 로직
    registerUser(userId: string, socketId: string): boolean {
        if (this.userSocketMap.has(userId)) {
            return false; // 중복
        }
        this.userSocketMap.set(userId, socketId);
        this.userRoomsMap.set(userId, new Set());
        return true;
    }

    // 유저 해제 로직
    disconnectUserBySocketId(socketId: string) {
        // socketId로 userId 찾기
        let targetUserId: string | undefined = undefined;
        for (const [userId, sId] of this.userSocketMap.entries()) {
            if (sId === socketId) {
                targetUserId = userId;
                break;
            }
        }
        if (!targetUserId) return;

        // 앱에서 제거
        this.userSocketMap.delete(targetUserId);
        const rooms = this.userRoomsMap.get(targetUserId) || new Set();
        this.userRoomsMap.delete(targetUserId);

        // roomMembersMap에서 해당 유저 제거
        rooms.forEach((roomId) => {
            const members = this.roomMembersMap.get(roomId);
            if (members) {
                members.delete(targetUserId);
                if (members.size === 0) {
                    this.roomMembersMap.delete(roomId);
                    console.log(`방 ${roomId}가 비어 삭제됨`);
                }
            }
        });
    }

    // 랜덤 roomId
    generateRandomRoomId(): string {
        return Math.random().toString(36).substring(2, 8);
    }

    // 방 생성
    createRoom(hostId: string, participants: string[]): {
        roomId: string;
        allParticipants: string[];
    } {
        const roomId = this.generateRandomRoomId();
        const all = [...participants, hostId];
        this.roomMembersMap.set(roomId, new Set(participants));

        all.forEach((userId) => {
            const userSet = this.userRoomsMap.get(userId) || new Set();
            userSet.add(roomId);
            this.userRoomsMap.set(userId, userSet);
        });

        return { roomId, allParticipants: all };
    };

    // 방 join
    joinRoom(userId: string, roomId: string): { success: boolean; participants?: string[] } {
        const members = this.roomMembersMap.get(roomId);
        if (!members) {
            return { success: false };
        }
        members.add(userId);

        // userRoomsMap도 업데이트
        const rooms = this.userRoomsMap.get(userId) || new Set();
        rooms.add(roomId);
        this.userRoomsMap.set(userId, rooms);

        return { success: true, participants: Array.from(members) };
    }

    // 방 떠나기
    leaveRoom(userId: string, roomId: string) {
        const members = this.roomMembersMap.get(roomId);
        if (!members) {
            return false;
        }
        members.delete(userId);
        if (members.size === 0) {
            this.roomMembersMap.delete(roomId);
            console.log(`모두 떠나서 방 ${roomId} 삭제`);
        }

        const userSet = this.userRoomsMap.get(userId);
        if (userSet) {
            userSet.delete(roomId);
        }
        return true;
    }

    // userId로 소켓 찾기
    getSocketId(userId: string): string | undefined {
        return this.userSocketMap.get(userId);
    }
}