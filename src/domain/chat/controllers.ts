import { Body, Controller, Post } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { SearchMessagesByUserQuery } from './queries';

@Controller('chat')
export default class ChatController {
  constructor(private readonly queryBus: QueryBus) {}

  @Post('search')
  async search(@Body() { userId, keyword }: { userId: string; keyword: string }) {
    return this.queryBus.execute(new SearchMessagesByUserQuery(userId, keyword));
  }
}
