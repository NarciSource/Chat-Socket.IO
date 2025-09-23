import * as dotenv from "dotenv";

dotenv.config();

import { ChatMessage } from "./models";
import { BasicParser, IStreamParser, SocketIOParser } from "./parsers";
import { RedisStreamReader } from "./stream";
import { DynamoWriter, dynamoSchemaDefinition } from "./database";
import { healthCheck, setHealthy } from "./api";

const REDIS_STREAM_PARSER = process.env.REDIS_STREAM_PARSER || "basic";

async function main() {
  const parserMap: Record<string, IStreamParser<ChatMessage>> = {
    basic: new BasicParser(),
    "socket.io": new SocketIOParser(),
  };

  // 파서 선택
  const parser = parserMap[REDIS_STREAM_PARSER];
  // 스트림 읽기
  const reader = new RedisStreamReader<ChatMessage>(parser);
  // 데이터 쓰기
  const writer = new DynamoWriter<ChatMessage>(dynamoSchemaDefinition);

  for await (const events of reader.listen()) {
    for (const [eventId, data] of events) {
      if (data.eventName === "receive_message") {
        const { roomId, userId, content } = data.payload as ChatMessage;
        const timestamp = eventId.split("-")[0];
        const createdAt = new Date(parseInt(timestamp));

        const message = {
          roomId,
          userId,
          content,
          createdAt,
        };

        writer.updateChatMessage(eventId, message);
      }
    }
  }
}

try {
  void main();

  healthCheck(); // 헬스체크 API
  setHealthy(true);
} catch (error) {
  console.error(error);
  setHealthy(false);
}
