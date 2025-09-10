import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { GetUserQuery } from './queries';

@Controller('chat')
export default class UsersController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('users')
  async getUsers() {
    // Service를 통해 데이터 조회
    return await this.queryBus.execute(new GetUserQuery());
  }
}
