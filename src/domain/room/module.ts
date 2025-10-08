import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { RepositoryModule } from 'src/repository';
import * as commands from './commands';
import * as events from './events';
import RoomGateway from './gateway';

@Module({
  imports: [CqrsModule, RepositoryModule],
  providers: [RoomGateway, ...Object.values(commands), ...Object.values(events)],
  exports: [RoomGateway],
})
export default class RoomModule {}
