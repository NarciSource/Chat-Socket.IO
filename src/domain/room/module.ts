import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { RepositoryModule } from 'src/repository';
import * as commands from './commands';
import * as queries from './queries';
import RoomEventsHandler from './eventsHandler';
import RoomGateway from './gateway';

@Module({
  imports: [CqrsModule, RepositoryModule],
  providers: [
    RoomEventsHandler,
    RoomGateway,
    ...Object.values(queries),
    ...Object.values(commands),
  ],
  exports: [RoomGateway, RoomEventsHandler],
})
export default class RoomModule {}
