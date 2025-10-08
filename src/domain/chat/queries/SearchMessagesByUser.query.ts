import { Query } from '@nestjs/cqrs';

import Message from 'src/model/Message';

export default class SearchMessagesByUserQuery extends Query<Message[]> {
  constructor(
    public readonly userId: string,
    public readonly keyword: string,
  ) {
    super();
  }
}
