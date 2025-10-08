import { Global, Module } from '@nestjs/common';

import {
  dbProvider,
  pubsubAdapterProvider,
  streamsAdapterProvider,
  REDIS_STORAGE,
  REDIS_PUBSUB_ADAPTER,
  REDIS_STREAMS_ADAPTER,
} from './providers';

@Global()
@Module({
  providers: [dbProvider, pubsubAdapterProvider, streamsAdapterProvider],
  exports: [REDIS_STORAGE, REDIS_PUBSUB_ADAPTER, REDIS_STREAMS_ADAPTER],
})
export default class RedisModule {}
