import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import Room from 'src/model/Room';
import { IRepository } from 'src/repository';
import GetRoomsByUserQuery from './GetRoomsByUser.query';

@QueryHandler(GetRoomsByUserQuery)
export default class GetMessageHistoryHandler implements IQueryHandler<GetRoomsByUserQuery> {
  constructor(
    @Inject('IRepository')
    private readonly repository: IRepository,
  ) {}

  async execute({ userId }: GetRoomsByUserQuery) {
    const roomIds = await this.repository.getRoomsByUser(userId);

    return roomIds.map((id) => ({ id }) as Room);
  }
}
