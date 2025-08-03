import { NestFactory } from '@nestjs/core';
import { NestExpressApplication, ExpressAdapter } from '@nestjs/platform-express';

import { CoreModule } from './core/module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(CoreModule, new ExpressAdapter());

  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
