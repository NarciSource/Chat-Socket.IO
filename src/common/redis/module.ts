import { Global, Module } from '@nestjs/common';

import { dbProvider, pubsubAdapterProvider, streamsAdapterProvider } from './providers';

@Global()
@Module({
  providers: [dbProvider, pubsubAdapterProvider, streamsAdapterProvider],
  exports: ['REDIS_CLIENT', 'REDIS_PUBSUB_ADAPTER', 'REDIS_STREAMS_ADAPTER'],
})
export default class RedisModule {}
