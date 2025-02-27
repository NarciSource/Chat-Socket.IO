import { Global, Module } from "@nestjs/common";
import { createClient } from 'redis';

@Global()
@Module({
    providers: [
        {
            provide: 'REDIS_CLIENT',
            useFactory: async () => {
                const client = createClient({
                    url: 'redis://localhost:6379',
                });
                // async connect
                await client.connect();
                console.log('[RedisModule] Connected to Redis')
                return client;
            
            },
        },
    ],
    exports: ['REDIS_CLIENT'],
})
export class RedisModule {}