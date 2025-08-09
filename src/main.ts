import { NestFactory } from '@nestjs/core';
import { NestExpressApplication, ExpressAdapter } from '@nestjs/platform-express';
import { createAdapter } from '@socket.io/redis-adapter';

import { RedisIoAdapter } from './common/RedisIoAdapter';
import { CoreModule } from './core/module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(CoreModule, new ExpressAdapter());

  const adapterConstructor = app.get<ReturnType<typeof createAdapter>>('REDIS_PUBSUB');
  const redisIoAdapter = new RedisIoAdapter(app, adapterConstructor);
  app.useWebSocketAdapter(redisIoAdapter);

  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
