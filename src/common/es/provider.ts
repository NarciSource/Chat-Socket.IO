import { Client } from '@elastic/elasticsearch';
import { Logger, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const ES_STORAGE = Symbol('ES_STORAGE');

export default {
  provide: ES_STORAGE,
  useFactory: async (configService: ConfigService) => {
    const logger = new Logger('Elasticsearch');
    const host = configService.get<string>('ES_HOST', 'localhost');
    const port = configService.get<number>('ES_PORT', 9200);
    const username = configService.get<string>('ES_USERNAME', 'user');
    const password = configService.get<string>('ES_PASSWORD', 'password');

    const client = new Client({
      node: `http://${host}:${port}`,
      auth: { username, password },
    });

    try {
      await client.ping();
      logger.log(`${host}:${port}에 연결 완료`);

      const info = await client.info();
      logger.log(`Cluster: ${info.cluster_name} (${info.version.number})`);
    } catch (error) {
      logger.error(`${host}:${port}에 연결 실패`, error);
    }

    return client;
  },
  inject: [ConfigService],
} as Provider;
