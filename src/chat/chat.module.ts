import { Module } from '@nestjs/common';

import { RepositoryModule } from '../repository/repository.module';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

@Module({
  imports: [RepositoryModule],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
