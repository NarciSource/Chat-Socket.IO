import * as dotenv from "dotenv";

dotenv.config();

import { ChatMessage } from "./model";
import { dynamoSchemaDefinition } from "./schemaDefinition";
import RedisStreamReader from "./stream-reader";
import DynamoWriter from "./dynamo-writer";
import healthCheck, { setHealthy } from "./healthCheck";

async function main() {
  const reader = new RedisStreamReader<ChatMessage>();
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
