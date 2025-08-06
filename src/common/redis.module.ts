import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
