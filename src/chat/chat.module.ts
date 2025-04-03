import { Module } from '@nestjs/common';

import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { ChatRepository } from './chat.repository';
import { SimpleChatRepository } from './simple.repository';

@Module({
  providers: [
    ChatGateway,
    ChatService,
    {
      provide: 'IChatRepository',
      useClass: SimpleChatRepository,
    },
  ],
  exports: ['IChatRepository'],
})
export class ChatModule {}
