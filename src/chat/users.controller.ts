import { Controller, Get } from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('chat')
export class UsersController {
  constructor(private readonly appService: UsersService) {}

  @Get('users')
  getUsers() {
    // Service를 통해 데이터 조회
    return this.appService.getUsers();
  }
}
