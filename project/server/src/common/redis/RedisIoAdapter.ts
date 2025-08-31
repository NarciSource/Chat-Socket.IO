import { INestApplication, Logger } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { Server, ServerOptions } from 'socket.io';

/**
 * # RedisIoAdapter
 *
 * NestJS의 기본 WebSocket 어댑터를 확장하여,
 * 여러 서버 인스턴스 간의 실시간 이벤트를 Redis Pub/Sub을 통해
 * 동기화하도록 하는 어댑터 클래스.
 *
 * - `@nestjs/websockets`의 IoAdapter를 상속합니다.
 * - Socket.IO의 Redis 어댑터(`@socket.io/redis-adapter`)를 사용하여
 *   다중 인스턴스 환경에서 이벤트를 공유합니다.
 *
 * ## 주요 기능
 * - 특정 서버에서 발생한 이벤트가 전체 클러스터에 브로드캐스트됨
 * - Redis Pub/Sub 연결을 자동으로 관리
 *
 * ## 사용 예시
 * ```ts
 * const app = await NestFactory.create(AppModule);
 * const redisIoAdapter = new RedisIoAdapter(app, adapterConstructor);
 * app.useWebSocketAdapter(redisIoAdapter);
 * await app.listen(3000);
 * ```
 */
export default class RedisIoAdapter extends IoAdapter {
  private logger = new Logger(RedisIoAdapter.name);

  constructor(
    app: INestApplication,
    private adapterConstructor: ReturnType<typeof createAdapter>,
  ) {
    super(app);
  }

  override createIOServer(port: number, options?: Partial<ServerOptions>): Server {
    // Socket.IO 서버 생성
    const server = super.createIOServer(port, options) as Server;
    // 어댑터 주입
    server.adapter(this.adapterConstructor);

    this.logger.log(`Socket.IO 서버 생성 완료 (port=${port}, path=${options?.path ?? '/'})`);
    this.logger.log(`Redis 어댑터 연결`);

    return server;
  }
}
