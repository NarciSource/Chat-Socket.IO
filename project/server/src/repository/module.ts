import Redis from 'ioredis';
import * as dynamoose from 'dynamoose';
import { Client as ESClient } from '@elastic/elasticsearch';
import { Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { REDIS_STORAGE, DYNAMO_STORAGE, ES_STORAGE } from 'src/common/symbols';
import InMemoryRepository from './InMemoryRepository';
import DatabaseRepository from './DatabaseRepository';

type DynamoClient = typeof dynamoose;

@Module({
  providers: [
    {
      provide: 'IRepository', // 추상 레포지토리
      useFactory: (
        configService: ConfigService,
        redisClient: Redis,
        dynamoClient: DynamoClient,
        esClient: ESClient,
      ) => {
        const logger = new Logger('Repository');
        // 구현체를 선택하는 팩토리 함수
        const repositoryType = configService.get<string>('REPOSITORY_TYPE', 'InMemory');

        logger.log(`선택된 레포지토리 형태: ${repositoryType}`);

        switch (repositoryType) {
          case 'InMemory':
            return new InMemoryRepository();
          case 'Database':
            return new DatabaseRepository(configService, redisClient, dynamoClient, esClient);
        }
      },
      inject: [ConfigService, REDIS_STORAGE, DYNAMO_STORAGE, ES_STORAGE],
    },
  ],

  exports: ['IRepository'], // 다른 모듈에서는 인터페이스를 사용하여 의존성 주입을 받을 수 있도록 export
})
export default class RepositoryModule {}
