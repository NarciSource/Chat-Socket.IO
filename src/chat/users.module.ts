import { Module } from '@nestjs/common';

import { RepositoryModule } from './repository.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [RepositoryModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
