import * as dotenv from "dotenv";

dotenv.config();

import RedisStreamReader from "./stream-reader";
import { updateChatMessage } from "./dynamo-writer";

async function main() {
  const reader = new RedisStreamReader();

  for await (const events of reader.listen()) {
    for (const [eventId, data] of events) {
      if (data.eventName === "receive_message") {
        const { roomId, senderId, content } = data.payload as Record<string, any>;
        const uid = data.uid;

        updateChatMessage(eventId, { roomId, senderId, content, uid });
      }
    }
  }
}

void main();
