import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { IRepository } from 'src/repository';
import Message from 'src/model/Message';
import SearchMessagesByUserQuery from './SearchMessagesByUser.query';

@QueryHandler(SearchMessagesByUserQuery)
export default class SearchMessagesByUserHandler
  implements IQueryHandler<SearchMessagesByUserQuery>
{
  constructor(
    @Inject('IRepository')
    private readonly repository: IRepository,
  ) {}

  async execute({ userId, keyword }: SearchMessagesByUserQuery): Promise<Message[]> {
    return this.repository.searchByKeyword(userId, keyword);
  }
}
