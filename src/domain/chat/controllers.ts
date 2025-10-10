import { Body, Controller, Post } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { GetRoomsByUserQuery } from '../room/quires';
import { SearchMessagesQuery } from './queries';

@Controller('chat')
export default class ChatController {
  constructor(private readonly queryBus: QueryBus) {}

  @Post('search')
  async search(@Body() { userId, keyword }: { userId: string; keyword: string }) {
    const rooms = await this.queryBus.execute(new GetRoomsByUserQuery(userId));

    return this.queryBus.execute(new SearchMessagesQuery(rooms, keyword));
  }
}
