import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { IRepository } from 'src/repository';
import GetSocketIdQuery from './GetSocketId.query';

@QueryHandler(GetSocketIdQuery)
export default class GetSocketIdHandler implements IQueryHandler<GetSocketIdQuery> {
  constructor(
    @Inject('IRepository')
    private readonly repository: IRepository,
  ) {}

  async execute({ userId }: GetSocketIdQuery) {
    return this.repository.getUserSocketByUserId(userId);
  }
}
