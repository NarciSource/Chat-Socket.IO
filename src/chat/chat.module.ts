import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatRepository } from '../chat.repository';

@Module({
    providers: [ChatService, ChatRepository]
})
export class ChatModule {}
