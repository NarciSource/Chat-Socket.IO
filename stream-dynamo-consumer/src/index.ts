import * as dotenv from "dotenv";

dotenv.config();

import { ChatMessage } from "./model";
import { dynamoSchemaDefinition } from "./schemaDefinition";
import RedisStreamReader from "./stream-reader";
import DynamoWriter from "./dynamo-writer";

async function main() {
  const reader = new RedisStreamReader<ChatMessage>();
  const writer = new DynamoWriter<ChatMessage>(dynamoSchemaDefinition);

  for await (const events of reader.listen()) {
    for (const [eventId, data] of events) {
      if (data.eventName === "receive_message") {
        const { roomId, senderId, content } = data.payload as ChatMessage;
        const timestamp = eventId.split("-")[0];
        const createdAt = new Date(parseInt(timestamp));

        const message = {
          roomId,
          senderId,
          content,
          createdAt,
        };

        writer.updateChatMessage(eventId, message);
      }
    }
  }
}

void main();
