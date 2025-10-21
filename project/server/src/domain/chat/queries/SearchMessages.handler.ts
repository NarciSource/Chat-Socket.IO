import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import Message from 'src/model/Message';
import { IRepository } from 'src/repository';
import SearchMessagesQuery from './SearchMessages.query';

@QueryHandler(SearchMessagesQuery)
export default class SearchMessagesByUserHandler implements IQueryHandler<SearchMessagesQuery> {
  constructor(
    @Inject('IRepository')
    private readonly repository: IRepository,
  ) {}

  async execute({ rooms, keyword }: SearchMessagesQuery): Promise<Message[]> {
    const roomIds = rooms.map(({ id }) => id);

    return this.repository.searchByKeyword(roomIds, keyword);
  }
}
