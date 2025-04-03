import { Inject, Injectable } from '@nestjs/common';

import IChatRepository from './chat/repository';

@Injectable()
export class AppService {
  constructor(
    @Inject('IChatRepository')
    private readonly chatRepository: IChatRepository,
  ) {}

  getUsers() {
    return this.chatRepository.getUserKeys();
  }
}
