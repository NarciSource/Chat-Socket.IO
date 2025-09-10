import { Query } from '@nestjs/cqrs';

export default class GetUserQuery extends Query<string[]> {
  constructor() {
    super();
  }
}
