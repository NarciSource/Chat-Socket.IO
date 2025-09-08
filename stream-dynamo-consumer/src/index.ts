import * as dotenv from "dotenv";

dotenv.config();

import RedisStreamReader from "./stream-reader";
import DynamoWriter from "./dynamo-writer";

async function main() {
  const reader = new RedisStreamReader();
  const writer = new DynamoWriter();

  for await (const events of reader.listen()) {
    for (const [eventId, data] of events) {
      if (data.eventName === "receive_message") {
        const { roomId, senderId, content } = data.payload as Record<string, any>;
        const uid = data.uid;
        const timestamp = eventId.split("-")[0];
        const createdAt = new Date(parseInt(timestamp));

        writer.updateChatMessage(eventId, {
          roomId,
          senderId,
          content,
          uid,
          createdAt,
        });
      }
    }
  }
}

void main();
