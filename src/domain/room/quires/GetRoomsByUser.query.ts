import { Query } from '@nestjs/cqrs';

import Room from 'src/model/Room';

export default class GetRoomsByUserQuery extends Query<Room[]> {
  constructor(public readonly userId: string) {
    super();
  }
}
