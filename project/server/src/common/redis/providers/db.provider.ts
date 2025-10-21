import Redis from 'ioredis';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const REDIS_STORAGE = Symbol('REDIS_STORAGE');

export default {
  provide: REDIS_STORAGE,
  useFactory: async (configService: ConfigService) => {
    const logger = new Logger('RedisStorage');
    const host = configService.get<string>('REDIS_HOST', 'localhost');
    const port = configService.get<number>('REDIS_PORT', 6379);
    const redisUrl = `redis://${host}:${port}`;

    // Redis 클라이언트 생성
    const client = new Redis({ host, port, lazyConnect: true });

    try {
      await client.connect();
      logger.log(`${redisUrl}에 연결 완료`);
    } catch (error) {
      logger.error(`${redisUrl}에 연결 실패`, error);
    }

    return client;
  },
  inject: [ConfigService],
};
