import { Global, Module } from '@nestjs/common';

import dbProvider from './db.provider';
import pubsubProvider from './pubsubAdapter.provider';
import streamsAdapterProvider from './streamsAdapter.provider';

@Global()
@Module({
  providers: [dbProvider, pubsubProvider, streamsAdapterProvider],
  exports: ['REDIS_CLIENT', 'REDIS_PUBSUB_ADAPTER', 'REDIS_STREAMS_ADAPTER'],
})
export default class RedisModule {}
