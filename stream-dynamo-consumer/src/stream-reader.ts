import Redis from "ioredis";

const REDIS_HOST = process.env.REDIS_HOST || "localhost";
const REDIS_PORT = Number(process.env.REDIS_PORT || 6379);
const STREAM_KEY = process.env.STREAM_KEY || "socket.io";

// 타입 정의
type XReadArgs = Parameters<Redis["xread"]>;

export default class RedisStreamReader {
  // Redis 연결
  private redis = new Redis({ host: REDIS_HOST, port: REDIS_PORT });
  private xReadArgs = [
    ["BLOCK", 5000],
    ["STREAMS", STREAM_KEY, "$"],
  ];

  constructor() {
    console.log(`Listening stream ${STREAM_KEY}...`);
  }

  async *listen() {
    while (true) {
      const streams = await this.redis.xread(
        ...(this.xReadArgs.flat() as XReadArgs)
      );
      if (!streams) continue;

      yield streams;
    }
  }
}
