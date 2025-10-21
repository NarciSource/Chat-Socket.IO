import { Redis } from 'ioredis';
import { createAdapter } from '@socket.io/redis-adapter';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const REDIS_PUBSUB_ADAPTER = Symbol('REDIS_PUBSUB_ADAPTER');

export default {
  provide: REDIS_PUBSUB_ADAPTER,
  useFactory: async (configService: ConfigService) => {
    const logger = new Logger('RedisPubSub');
    const host = configService.get<string>('REDIS_HOST', 'localhost');
    const port = configService.get<number>('REDIS_PORT', 6379);

    // Redis 클라이언트 pub 및 sub 쌍 생성
    const publisher = new Redis({ host, port, lazyConnect: true });
    const subscriber = new Redis({ host, port, lazyConnect: true });

    try {
      await Promise.all([publisher.connect(), subscriber.connect()]);
      logger.log(`${host}:${port}에 연결 완료`);
    } catch (error) {
      logger.error(`${host}:${port} 연결 실패`, error);
      throw error;
    }

    // Redis 어댑터 생성
    return createAdapter(publisher, subscriber);
  },
  inject: [ConfigService],
};
