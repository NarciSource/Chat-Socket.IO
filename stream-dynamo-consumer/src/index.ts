import * as dotenv from "dotenv";

dotenv.config();

import RedisStreamReader from "./stream-reader.js";

async function main() {
  const reader = new RedisStreamReader();

  for await (const events of reader.listen()) {
    for (const [id, data] of events) {
      console.log(`[Event ${id}]`, data);
    }
  }
}

void main();
