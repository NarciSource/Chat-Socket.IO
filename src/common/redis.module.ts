import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: async (configService: ConfigService) => {
        const repositoryType = configService.get<string>('REPOSITORY_TYPE');
        const host = configService.get<string>('REDIS_HOST', 'localhost');
        const port = configService.get<number>('REDIS_PORT', 6379);

        if (repositoryType !== 'redis') {
          return null;
        }

        const client = createClient({
          url: `redis://${host}:${port}`,
        });
        client.on('connect', () => console.log('[RedisModule] Redis client connected'));
        client.on('error', (err) => console.error('Redis Client Error', err));

        await client.connect();

        return client;
      },
      inject: [ConfigService],
    },
    {
      provide: 'REDIS_PUBSUB',
      useFactory: async (configService: ConfigService) => {
        const host = configService.get<string>('REDIS_HOST', 'localhost');
        const port = configService.get<number>('REDIS_PORT', 6379);
        const redisUrl = `redis://${host}:${port}`;

        const pub = createClient({ url: redisUrl });
        const sub = pub.duplicate();

        await pub.connect();
        await sub.connect();

        return createAdapter(pub, sub);
      },
      inject: [ConfigService],
    },
  ],
  exports: ['REDIS_CLIENT', 'REDIS_PUBSUB'],
})
export class RedisModule {}
