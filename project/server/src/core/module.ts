import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DynamoModule } from 'src/common/dynamo';
import { ESModule } from 'src/common/es';
import { RedisModule } from 'src/common/redis';
import * as events from 'src/domain/shared/events';
import { ChatModule } from 'src/domain/chat';
import { RoomModule } from 'src/domain/room';
import { UserModule } from 'src/domain/user';
import ServerEventRegistry from './eventRegistry';
import { HealthCheckController } from './controller';
import { CoreGateway } from './gateway';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    RedisModule,
    DynamoModule,
    ESModule,

    UserModule,
    RoomModule,
    ChatModule,
  ],
  controllers: [HealthCheckController],
  providers: [
    CoreGateway,
    ServerEventRegistry,
    ...Object.values(events),
    {
      provide: 'SOCKET_SERVER',
      useFactory: (gateway: CoreGateway) => () => gateway.getServer(),
      inject: [CoreGateway],
    },
  ],
})
export class CoreModule {}
