import { Query } from '@nestjs/cqrs';

import Message from 'src/model/Message';
import Room from 'src/model/Room';

export default class SearchMessagesQuery extends Query<Message[]> {
  constructor(
    public readonly rooms: Room[],
    public readonly keyword: string,
  ) {
    super();
  }
}
