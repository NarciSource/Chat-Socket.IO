import { Controller, Get } from '@nestjs/common';

import { UserService } from './service';

@Controller('chat')
export class UsersController {
  constructor(private readonly service: UserService) {}

  @Get('users')
  getUsers() {
    // Service를 통해 데이터 조회
    return this.service.getUsers();
  }
}
