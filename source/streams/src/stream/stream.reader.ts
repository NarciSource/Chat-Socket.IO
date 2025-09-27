import Redis from "ioredis";

import { IStreamParser } from "../parsers";
import StreamService from "./stream.service";

const REDIS_HOST = process.env.REDIS_HOST || "localhost";
const REDIS_PORT = Number(process.env.REDIS_PORT || 6379);
const REDIS_STREAM_KEY = process.env.REDIS_STREAM_KEY || "message";

// 타입 정의
type XReadArgs = Parameters<Redis["xread"]>;

export default class RedisStreamReader<T> {
  private xReadArgs = [
    ["BLOCK", 5000],
    ["STREAMS", REDIS_STREAM_KEY, "$"],
  ];

  private redis: Redis;
  private service: StreamService<T>;

  constructor(readonly parser: IStreamParser<T>) {
    // Redis 연결
    this.redis = new Redis({ host: REDIS_HOST, port: REDIS_PORT });
    // 서비스 등록
    this.service = new StreamService(parser);

    console.log(`Listening stream ${REDIS_STREAM_KEY}...`);
  }

  async *listen() {
    while (true) {
      const streams = await this.redis.xread(
        ...(this.xReadArgs.flat() as XReadArgs)
      );
      if (!streams) continue;

      const parsed = this.service.parseResult(streams);
      if (parsed.size > 0) yield parsed;
    }
  }
}
