import { Module } from '@nestjs/common';

import { RedisModule } from './redis.module';
import { RedisRepository } from './repository.redis';
import { SimpleRepository } from './repository.simple';

@Module({
  imports: [RedisModule],
  providers: [
    {
      provide: 'IRepository', // 추상 레포지토리
      useClass: RedisRepository, // 구현체
    },
  ],
  exports: ['IRepository'], // 다른 모듈에서는 인터페이스를 사용하여 의존성 주입을 받을 수 있도록 export
})
export class RepositoryModule {}
