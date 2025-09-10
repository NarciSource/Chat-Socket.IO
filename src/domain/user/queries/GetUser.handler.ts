import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { IRepository } from 'src/repository';
import GetUserQuery from './GetUser.query';

@QueryHandler(GetUserQuery)
export default class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(
    @Inject('IRepository')
    private readonly repository: IRepository,
  ) {}

  async execute() {
    return this.repository.getUserKeys();
  }
}
