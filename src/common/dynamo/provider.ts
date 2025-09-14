import * as dynamoose from 'dynamoose';
import { DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import { ConfigService } from '@nestjs/config';

/**
 * @module provider
 *
 * @property {string} provide - 의존성 주입을 위한 토큰 이름 ("DYNAMO_CLIENT").
 * @property {Function} useFactory - Dynamoose 설정을 생성하는 팩토리 함수입니다.
 *
 * @function useFactory
 * Dynamoose 설정을 초기화하고 AWS DynamoDB 클라이언트를 구성합니다.
 *  - 가짜 자격 증명 (`accessKeyId`, `secretAccessKey`)을 사용합니다.
 *  - `endpoint`는 `http://<DB_HOST>:<DB_PORT>` 형식으로 설정됩니다.
 *  - `region`은 "local"로 설정됩니다.
 *
 * @returns {typeof dynamoose} 설정된 Dynamoose 인스턴스를 반환합니다.
 */
export default {
  provide: 'DYNAMO_CLIENT',
  useFactory: (configService: ConfigService) => {
    const DYNAMO_HOST = configService.get<string>('DYNAMO_HOST', 'localhost');
    const DYNAMO_PORT = configService.get<string>('DYNAMO_PORT', '8000');

    const config: DynamoDBClientConfig = {
      credentials: {
        // 로컬에서는 fake 자격 증명을 사용
        accessKeyId: 'fakeKey',
        secretAccessKey: 'fakeSecretKey',
      },
      endpoint: `http://${DYNAMO_HOST}:${DYNAMO_PORT}`,
      region: 'local', // 로컬 설정
    };

    const ddb = new dynamoose.aws.ddb.DynamoDB(config);
    dynamoose.aws.ddb.set(ddb);

    return dynamoose;
  },
  inject: [ConfigService],
};
