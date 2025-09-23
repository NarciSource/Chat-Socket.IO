import Redis from "ioredis";

import { IStreamParser, ParsedEvent } from "../parsers";

const REDIS_HOST = process.env.REDIS_HOST || "localhost";
const REDIS_PORT = Number(process.env.REDIS_PORT || 6379);
const REDIS_STREAM_KEY = process.env.REDIS_STREAM_KEY || "message";

// 타입 정의
type XReadStreamEntry = [id: string, fields: string[]];
type XReadStream = [streamName: string, entries: XReadStreamEntry[]];
type XReadResult = XReadStream[] | null;
type XReadArgs = Parameters<Redis["xread"]>;

export default class RedisStreamReader<T> {
  // Redis 연결
  private redis = new Redis({ host: REDIS_HOST, port: REDIS_PORT });
  private xReadArgs = [
    ["BLOCK", 5000],
    ["STREAMS", REDIS_STREAM_KEY, "$"],
  ];

  constructor(private readonly parser: IStreamParser<T>) {
    console.log(`Listening stream ${REDIS_STREAM_KEY}...`);
  }

  async *listen() {
    while (true) {
      const streams = await this.redis.xread(
        ...(this.xReadArgs.flat() as XReadArgs)
      );
      if (!streams) continue;

      const parsed = this.parseResult(streams);
      if (parsed.size > 0) yield parsed;
    }
  }

  /**
   * xread 반환값 전체 파싱
   */
  private parseResult(result: XReadResult): Map<string, ParsedEvent<T>> {
    const map = new Map<string, ParsedEvent<T>>();
    if (!result) return map;

    for (const stream of result) {
      const entries = this.parseStream(stream);
      for (const [id, event] of entries) {
        map.set(id, event);
      }
    }
    return map;
  }

  /**
   * 개별 스트림 파싱
   */
  private parseStream([, entries]: XReadStream): Map<string, ParsedEvent<T>> {
    const map = new Map<string, ParsedEvent<T>>();
    for (const entry of entries) {
      const parsed = this.parseEntry(entry);
      if (parsed) map.set(parsed[0], parsed[1]);
    }
    return map;
  }

  /**
   * 단일 엔트리 파싱
   */
  private parseEntry([id, fields]: XReadStreamEntry):
    | [string, ParsedEvent<T>]
    | null {
    const record = this.parseFields(fields);

    const data = this.parser.parse(record);

    return data ? [id, data] : null;
  }

  /**
   * 필드 배열을 key-value 객체로 변환
   * ex. [ 'type', 'message', 'data', '{...}' ] → { type: 'message', data: '{...}' }
   */
  private parseFields(fields: string[]): Record<string, string> {
    const record: Record<string, string> = {};
    for (let i = 0; i < fields.length; i += 2) {
      record[fields[i]] = fields[i + 1];
    }
    return record;
  }
}
