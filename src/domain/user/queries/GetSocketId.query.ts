import { Query } from '@nestjs/cqrs';

export default class GetSocketIdQuery extends Query<string> {
  constructor(public readonly userId: string) {
    super();
  }
}
