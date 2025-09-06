import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createAdapter } from '@socket.io/redis-streams-adapter';
import { Redis } from 'ioredis';

export default {
  provide: 'REDIS_STREAMS_ADAPTER',
  useFactory: (configService: ConfigService): ReturnType<typeof createAdapter> => {
    const logger = new Logger('RedisStorage');
    const host = configService.get<string>('REDIS_HOST', 'localhost');
    const port = configService.get<number>('REDIS_PORT', 6379);

    const client = new Redis({ host, port });

    client.on('ready', () => logger.log(`${host}:${port}에 연결 완료`));
    client.on('error', (error) => logger.error(`${host}:${port}에 연결 실패`, error));

    // Redis 어댑터 생성
    return createAdapter(client, {});
  },
  inject: [ConfigService],
};
