import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserGateway, UserService, UsersController } from 'src/domain/user';
import { RoomGateway, RoomService, RoomEventsHandler } from 'src/domain/room';
import { ChatGateway } from 'src/domain/chat';
import { RepositoryModule } from 'src/repository';
import { HealthCheckController } from './controller';
import { CoreGateway } from './gateway';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), RepositoryModule],
  controllers: [UsersController, HealthCheckController],
  providers: [
    CoreGateway,
    ChatGateway,
    RoomGateway,
    RoomEventsHandler,
    UserGateway,
    RoomService,
    UserService,
  ],
})
export class CoreModule {}
