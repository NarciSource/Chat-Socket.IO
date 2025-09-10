import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { RepositoryModule } from 'src/repository';
import * as queries from './queries';
import * as commands from './commands';
import UserGateway from './gateway';
import UsersController from './controller';

@Module({
  imports: [CqrsModule, RepositoryModule],
  controllers: [UsersController],
  providers: [UserGateway, ...Object.values(queries), ...Object.values(commands)],
  exports: [UserGateway],
})
export default class UserModule {}
