import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { IRepository } from 'src/repository';
import GetMessageHistoryQuery from './GetMessageHistory.query';

@QueryHandler(GetMessageHistoryQuery)
export default class GetMessageHistoryHandler implements IQueryHandler<GetMessageHistoryQuery> {
  constructor(
    @Inject('IRepository')
    private readonly repository: IRepository,
  ) {}

  async execute({ roomId }: GetMessageHistoryQuery) {
    return this.repository.getMessageHistory(roomId);
  }
}
