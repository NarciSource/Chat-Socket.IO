import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserGateway } from 'src/domain/user/gateway';
import { UserService } from 'src/domain/user/service';
import { UsersController } from 'src/domain/user/controller';
import { RoomGateway } from 'src/domain/room/gateway';
import { RoomService } from 'src/domain/room/service';
import { ChatGateway } from 'src/domain/chat/gateway';
import { RepositoryModule } from 'src/repository/module';
import { HealthCheckController } from './controller';
import { CoreGateway } from './gateway';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), RepositoryModule],
  controllers: [UsersController, HealthCheckController],
  providers: [CoreGateway, ChatGateway, RoomGateway, UserGateway, RoomService, UserService],
})
export class CoreModule {}
