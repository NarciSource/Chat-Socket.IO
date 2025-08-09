import { Global, Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: async (configService: ConfigService) => {
        const logger = new Logger('RedisStorage');
        const host = configService.get<string>('REDIS_HOST', 'localhost');
        const port = configService.get<number>('REDIS_PORT', 6379);
        const redisUrl = `redis://${host}:${port}`;

        // Redis 클라이언트 생성
        const client = createClient({ url: redisUrl });

        try {
          await client.connect();
          logger.log(`${redisUrl}에 연결 완료`);
        } catch (error) {
          logger.error(`${redisUrl}에 연결 실패`, error);
        }

        return client;
      },
      inject: [ConfigService],
    },
    {
      provide: 'REDIS_PUBSUB_ADAPTER',
      useFactory: async (configService: ConfigService) => {
        const logger = new Logger('RedisPubSub');
        const host = configService.get<string>('REDIS_HOST', 'localhost');
        const port = configService.get<number>('REDIS_PORT', 6379);
        const redisUrl = `redis://${host}:${port}`;

        // Redis 클라이언트 pub 및 sub 쌍 생성
        const pub = createClient({ url: redisUrl });
        const sub = pub.duplicate();

        try {
          await Promise.all([pub.connect(), sub.connect()]);
          logger.log(`${redisUrl}에 연결 완료`);
        } catch (error) {
          logger.error(`${redisUrl}에 연결 실패)`, error);
          throw error;
        }

        // Redis 어댑터 생성
        return createAdapter(pub, sub);
      },
      inject: [ConfigService],
    },
  ],
  exports: ['REDIS_CLIENT', 'REDIS_PUBSUB_ADAPTER'],
})
export class RedisModule {}
