import { Module } from '@nestjs/common';

import DynamoProvider from './provider';

@Module({
  providers: [DynamoProvider],
  exports: ['DYNAMO_CLIENT'],
})
export default class DynamoModule {}
