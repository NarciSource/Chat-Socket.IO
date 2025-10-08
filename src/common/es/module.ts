import { Global, Module } from '@nestjs/common';

import ElasticsearchProvider from './provider';

@Global()
@Module({
  providers: [ElasticsearchProvider],
  exports: ['ES_CLIENT'],
})
export default class ESModule {}
