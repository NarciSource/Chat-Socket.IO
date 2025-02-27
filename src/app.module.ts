import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './chat/redis.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [RedisModule, ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
  