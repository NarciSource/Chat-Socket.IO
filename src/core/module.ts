import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ChatModule } from 'src/domain/chat';
import { RoomModule } from 'src/domain/room';
import { UserModule } from 'src/domain/user';
import { HealthCheckController } from './controller';
import { CoreGateway } from './gateway';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UserModule, RoomModule, ChatModule],
  controllers: [HealthCheckController],
  providers: [CoreGateway],
})
export class CoreModule {}
