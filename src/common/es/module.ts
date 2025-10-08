import { Module } from '@nestjs/common';

import ElasticsearchProvider from './provider';

@Module({
  providers: [ElasticsearchProvider],
  exports: ['ES_CLIENT'],
})
export default class ESModule {}
