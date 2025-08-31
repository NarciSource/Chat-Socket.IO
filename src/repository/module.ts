import { Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisClientType } from 'redis';

import { RedisModule } from '../common/redis.module';
import RedisRepository from './redis';
import SimpleRepository from './simple';

@Module({
  imports: [RedisModule],

  providers: [
    {
      provide: 'IRepository', // 추상 레포지토리
      useFactory: (ConfigService: ConfigService, redisClient: RedisClientType) => {
        const logger = new Logger('Repository');
        // 구현체를 선택하는 팩토리 함수
        const repositoryType = ConfigService.get<string>('REPOSITORY_TYPE', 'simple');

        logger.log(`선택된 레포지토리 형태: ${repositoryType}`);

        switch (repositoryType) {
          case 'simple':
            return new SimpleRepository();
          case 'redis':
            return new RedisRepository(redisClient);
        }
      },
      inject: [ConfigService, 'REDIS_CLIENT'],
    },
  ],

  exports: ['IRepository'], // 다른 모듈에서는 인터페이스를 사용하여 의존성 주입을 받을 수 있도록 export
})
export default class RepositoryModule {}
