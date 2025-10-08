import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { RepositoryModule } from 'src/repository';
import * as queries from './queries';
import ChatGateway from './gateway';

@Module({
  imports: [CqrsModule, RepositoryModule],
  providers: [ChatGateway, ...Object.values(queries)],
  exports: [ChatGateway],
})
export default class ChatModule {}
