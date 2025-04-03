import { Inject, Injectable } from '@nestjs/common';

import IRepository from './repository.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject('IRepository')
    private readonly chatRepository: IRepository,
  ) {}

  getUsers() {
    return this.chatRepository.getUserKeys();
  }
}
