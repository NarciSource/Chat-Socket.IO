import { Module } from '@nestjs/common';

import { RepositoryModule } from 'src/repository';
import RoomService from './service';
import RoomEventsHandler from './eventsHandler';
import RoomGateway from './gateway';

@Module({
  imports: [RepositoryModule],
  providers: [RoomService, RoomEventsHandler, RoomGateway],
  exports: [RoomGateway, RoomEventsHandler],
})
export default class RoomModule {}
