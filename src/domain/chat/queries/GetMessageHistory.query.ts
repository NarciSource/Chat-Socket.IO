import { Query } from '@nestjs/cqrs';

import Message from 'src/model/Message';

export default class GetMessageHistoryQuery extends Query<Message[]> {
  constructor(public readonly roomId: string) {
    super();
  }
}
