import { Module } from '@nestjs/common';

import { RepositoryModule } from 'src/repository';
import ChatGateway from './gateway';

@Module({
  imports: [RepositoryModule],
  providers: [ChatGateway],
  exports: [ChatGateway],
})
export default class ChatModule {}
