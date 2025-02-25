import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { ChatRepository } from './chat.repository';

@Module({
  imports: [ChatModule],
  controllers: [AppController],
  providers: [AppService, ChatRepository],
})
export class AppModule {}
  