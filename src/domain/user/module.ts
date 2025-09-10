import { Module } from '@nestjs/common';

import { RepositoryModule } from 'src/repository';
import UserService from './service';
import UserGateway from './gateway';
import UsersController from './controller';

@Module({
  imports: [RepositoryModule],
  controllers: [UsersController],
  providers: [UserService, UserGateway],
  exports: [UserGateway],
})
export default class UserModule {}
