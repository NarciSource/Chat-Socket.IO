import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { RedisModule } from '../common/redis.module';
import { RedisRepository } from './repository.redis';
import { SimpleRepository } from './repository.simple';

@Module({
  imports: [RedisModule],
  providers: [
    {
      provide: 'IRepository', // 추상 레포지토리
      useFactory: (ConfigService: ConfigService) => {
        // 구현체를 선택하는 팩토리 함수
        const repositoryType = ConfigService.get<string>('REPOSITORY_TYPE', 'simple');

        switch (repositoryType) {
          case 'simple':
            return new SimpleRepository();
          case 'redis':
            return new RedisRepository(ConfigService.get('REDIS_CLIENT'));
        }
      },
      inject: [ConfigService],
    },
  ],
  exports: ['IRepository'], // 다른 모듈에서는 인터페이스를 사용하여 의존성 주입을 받을 수 있도록 export
})
export class RepositoryModule {}
