import { Module } from '@nestjs/common';

import { RepositoryModule } from '../repository/repository.module';
import { UsersService } from './users.service';
import { HealthCheckController, UsersController } from './users.controller';

@Module({
  imports: [RepositoryModule],
  controllers: [UsersController, HealthCheckController],
  providers: [UsersService],
})
export class UsersModule {}
