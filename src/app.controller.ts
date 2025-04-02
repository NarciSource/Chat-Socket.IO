import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller('chat')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('users')
  getUsers() {
    // Service를 통해 데이터 조회
    return this.appService.getUsers();
  }
}
