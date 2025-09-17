import { CommandHandler, EventBus, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { IRepository } from 'src/repository';
import { EmitEvent } from 'src/domain/shared/events';
import RegisterUserCommand from './RegisterUser.command';
import { GetUserQuery } from '../queries';

@CommandHandler(RegisterUserCommand)
export default class RegisterUserHandler implements ICommandHandler<RegisterUserCommand> {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,

    @Inject('IRepository')
    private readonly repository: IRepository,
  ) {}

  async execute({ payload: { userId, socketId } }: RegisterUserCommand) {
    const has = await this.repository.hasUserSocket(userId);

    // 중복 접속 제어 (정책에 따라)
    if (has) {
      console.log(`이미 userId=${userId}로 연결된 소켓이 존재합니다.`);

      return false;
    }

    // 레포지토리 로직
    await this.repository.setUserSocket(userId, socketId);

    // 이벤트 발행
    const query = new GetUserQuery();
    const users = await this.queryBus.execute(query);

    const notifyEvent = new EmitEvent('get_users', null, { users });
    this.eventBus.publish(notifyEvent);

    return true;
  }
}
