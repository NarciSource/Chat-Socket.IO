import { Injectable } from '@nestjs/common';
import { ChatRepository } from './chat/chat.repository';

@Injectable()
export class AppService {
  constructor(private readonly chatRepository: ChatRepository) {}
  getUsers() {
    return this.chatRepository.getUserKeys();
  }
}
