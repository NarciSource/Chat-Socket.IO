import { Global, Module } from '@nestjs/common';

import dbProvider from './db.provider';
import pubsubProvider from './pubsubAdapter.provider';

@Global()
@Module({
  providers: [dbProvider, pubsubProvider],
  exports: ['REDIS_CLIENT', 'REDIS_PUBSUB_ADAPTER'],
})
export default class RedisModule {}
