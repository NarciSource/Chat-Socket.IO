import { Global, Module } from '@nestjs/common';

import ElasticsearchProvider, { ES_STORAGE } from './provider';

@Global()
@Module({
  providers: [ElasticsearchProvider],
  exports: [ES_STORAGE],
})
export default class ESModule {}
