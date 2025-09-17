import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { RepositoryModule } from 'src/repository';
import ChatGateway from './gateway';

@Module({
  imports: [CqrsModule, RepositoryModule],
  providers: [ChatGateway],
  exports: [ChatGateway],
})
export default class ChatModule {}
