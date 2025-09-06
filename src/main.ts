import { NestFactory } from '@nestjs/core';
import { NestExpressApplication, ExpressAdapter } from '@nestjs/platform-express';
import { createAdapter } from '@socket.io/redis-adapter';

import { RedisIoAdapter } from './common/redis';
import { CoreModule } from './core/module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(CoreModule, new ExpressAdapter());

  // RedisIoAdapter(WS)를 사용하여 WebSocket 어댑터 설정
  const adapterConstructor = app.get<ReturnType<typeof createAdapter>>('REDIS_STREAMS_ADAPTER');
  const redisIoAdapter = new RedisIoAdapter(app, adapterConstructor);
  app.useWebSocketAdapter(redisIoAdapter); // 어댑터 적용

  // CORS 설정 (필요에 따라 조정)
  app.enableCors();

  // 애플리케이션 외부 포트에서 수신 대기
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
