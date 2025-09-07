import Redis from "ioredis";
import * as dotenv from "dotenv";

dotenv.config();

const REDIS_HOST = process.env.REDIS_HOST || "localhost";
const REDIS_PORT = Number(process.env.REDIS_PORT || 6379);
const STREAM_KEY = process.env.STREAM_KEY || "socket.io";

// Redis 연결
const redis = new Redis({ host: REDIS_HOST, port: REDIS_PORT });

type XReadArgs = Parameters<Redis["xread"]>;

async function main() {
    console.log(`Listening stream ${STREAM_KEY}...`);

    const options = [
        ["BLOCK", 5000],
        ["STREAMS", STREAM_KEY, "$"],
    ];

    while (true) {
        const streams = await redis.xread(...(options.flat() as XReadArgs));
        if (!streams) continue;

        console.log(streams);
    }
}

void main();
