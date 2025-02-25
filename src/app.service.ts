import { Injectable } from '@nestjs/common';
import { ChatRepository } from './chat.repository';

@Injectable()
export class AppService {
  constructor(private readonly chatRepository: ChatRepository) {}
  getAllConnections() {
    return this.chatRepository.getAllUserSockets();
  }
}
