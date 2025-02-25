import { Injectable } from "@nestjs/common";
import { ChatRepository } from "./chat.repository";

/*
 * 방 생성/입장/퇴장 등 비즈니스 로직 담당
 * - Gateway(ChatGateway)에서 호출하여 사용
 */
@Injectable()
export class ChatService {
    constructor(private readonly chatRepository: ChatRepository) {}

    // 등록 로직
    registerUser(userId: string, socketId: string): boolean {
        if (this.chatRepository.hasUserSocket(userId)) {
            return false; // 중복
        }
        this.chatRepository.setUserSocket(userId, socketId);
        this.chatRepository.initUserRooms(userId);
        return true;
    }

    // 유저 해제 로직
    disconnectUserBySocketId(socketId: string) {
        const userId = this.chatRepository.findUserIdBySocketId(socketId);
        if (!userId) return;

        // socket map 제거
        this.chatRepository.removeUserSocket(userId);

        // rooms
        const rooms = this.chatRepository.getUserRooms(userId);
        this.chatRepository.removeUserRooms(userId);

        // roomMembersMap에서 해당 유저 제거
        rooms.forEach((roomId) => {
            const members = this.chatRepository.getRoomMembers(roomId);
            if (members) {
                members.delete(userId);
                if (members.size === 0) {
                    this.chatRepository.removeRoom(roomId)
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
        this.chatRepository.createRoom(roomId, participants);

        all.forEach((userId) => {
            this.chatRepository.addRoomToUser(userId, roomId);
        });

        return { roomId, allParticipants: all };
    };

    // 방 join
    joinRoom(userId: string, roomId: string): { success: boolean; participants?: string[] } {
        const members = this.chatRepository.getRoomMembers(roomId);
        if (!members) {
            return { success: false };
        }
        members.add(userId);

        // userRoomsMap도 업데이트
        this.chatRepository.addRoomToUser(userId, roomId);

        return { success: true, participants: Array.from(members) };
    }

    // 방 떠나기
    leaveRoom(userId: string, roomId: string) {
        const members = this.chatRepository.getRoomMembers(roomId);
        if (!members) {
            return false;
        }
        members.delete(userId);
        if (members.size === 0) {
            this.chatRepository.removeRoom(roomId);
            console.log(`모두 떠나서 방 ${roomId} 삭제`);
        }

        const rooms = this.chatRepository.getUserRooms(userId);
        rooms.delete(roomId);
        return true;
    }

    // userId로 소켓 찾기
    getSocketId(userId: string): string | undefined {
        return this.chatRepository.getUserSocketByUserId(userId);
    }
}