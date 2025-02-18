import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatRepository } from './chat.repository';
import { ChatGateway } from './chat-gateway';

@Module({
    providers: [ChatGateway, , ChatService, ChatRepository]
})
export class ChatModule {}
