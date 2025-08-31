import { Namespace, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';

import { RoomService } from './service';

/**
 * 방 정보를 생성할 때 사용할 'participantIds' 형식
 * - 원하는 만큼 참여자를 넣어 1:1 또는 1:N 모두 처리 가능
 */
export interface CreateRoomPayload {
  hostId: string; // 방을 생성한 사람 (옵션)
  participants: string[]; // 이 방에 들어갈 유저들의 userId 목록
}

@Injectable()
export class RoomGateway {
  public server: Namespace;

  constructor(private readonly service: RoomService) {}

  /**
   * 방 생성 이벤트 (1:1 ~ 1:N 모두 처리)
   *  - (예) socket.emit('create_room', {
   *        hostId: 'userA',
   *        participantIds: ['userA','userB','userC']
   *     });
   *  -> server가 랜덤 roomId를 만들어 roomMembersMap에 저장
   *  -> 해당 참여자들(userA,B,C)이 현재 소켓 연결 중이면 자동으로 room에 join
   *  -> roomId를 클라이언트에 반환 (필요시)
   */
  async handleCreateRoom(self: Socket, payload: CreateRoomPayload) {
    const { hostId, participants } = payload;
    const { roomId, participants: allParticipants } = await this.service.createRoom(
      hostId,
      participants,
    );

    // 서버 간 동기화를 위해 모든 서버 인스턴스 이벤트를 전달
    this.server.listeners('join-room').forEach((listener) => listener(self.id, roomId));
    for (const userId of allParticipants) {
      const socketId = await this.service.getSocketId(userId);

      this.server.serverSideEmit('join-room', socketId, roomId);
    }

    // 생성된 roomId를 모든 room 참가자에게 알림
    this.server.to(roomId).emit('room_created', {
      roomId,
      participants: allParticipants,
    });
  }

  /**
   * 방에 직접 join하는 이벤트
   * (이미 생성된 roomId에 대해, 특정 user가 뒤늦게 참여할 수 있음)
   *  - (예) socket.emit('join_room', { userId:'userA', roomId:'abc123' })
   */
  async handleJoinRoom(self: Socket, payload: { userId: string; roomId: string }) {
    const { userId, roomId } = payload;
    const result = await this.service.joinRoom(userId, roomId);

    if (!result.success) {
      self.emit('system', { content: `존재하지 않는 방: ${roomId}` });
      return;
    }

    // 실제 소켓 join
    const socketId = await this.service.getSocketId(userId);
    if (!socketId) {
      return;
    }

    // 새로운 참가자 알림
    this.server.to(roomId).emit('system', {
      content: `${userId} joined room: ${roomId}`,
    });

    console.log(`유저 ${userId}가 방 ${roomId}에 참여했습니다.`);

    // 서버 간 동기화 이벤트
    this.server.serverSideEmit('join-room', socketId, roomId);

    // 알림
    this.server.to(roomId).emit('room_created', {
      roomId,
      participants: result.participants,
    });
  }

  /**
   * 방 떠나기
   *  - (예) socket.emit('leave_room', { userId:'userB', roomId:'abc123' })
   */
  async handleLeaveRoom(self: Socket, payload: { userId: string; roomId: string }) {
    const { userId, roomId } = payload;

    await this.service.leaveRoom(userId, roomId);

    // 실제 소켓 leave
    const socketId = await this.service.getSocketId(userId);
    if (!socketId) {
      return;
    }

    console.log(`유저 ${userId}가 방 ${roomId}에서 나갔습니다.`);

    // 서버 간 동기화 이벤트
    this.server.listeners('leave-room').forEach((listener) => listener(socketId, roomId));
    this.server.serverSideEmit('leave-room', socketId, roomId);

    // 알림
    this.server.to(roomId).emit('system', {
      content: `${userId}님이 방을 떠났습니다.`,
    });
  }
}
