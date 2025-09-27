FROM node:20-bullseye-slim AS builder

WORKDIR /app

COPY package*.json .
COPY tsconfig.base.json .

COPY shared shared
COPY source/streams source/streams
COPY sink/elasticsearch-consumer sink/elasticsearch-consumer

RUN npm install

RUN npm run build:stream-elasticsearch

FROM node:20-bullseye-slim AS runner

RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=builder /app/dist dist
COPY --from=builder /app/package*.json .
COPY --from=builder /app/sink/elasticsearch-consumer/package.json sink/elasticsearch-consumer/package.json

RUN npm install --omit=dev

EXPOSE 3000

CMD ["node", "dist/sink/elasticsearch-consumer/src/index"]
