# 채팅 서비스 컨슈머

## 기술 스택

[![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/ko/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)  
[![Redis](https://img.shields.io/badge/Redis-FF4438?style=flat-square&logo=redis&logoColor=white)](https://redis.io)
[![Elasticsearch](https://img.shields.io/badge/Elasticsearch-005571?style=flat-square&logo=elasticsearch&logoColor=white)](https://www.elastic.co/kr/elasticsearch)
[![DynamoDB](https://img.shields.io/badge/DynamoDB-4053D6?style=flat-square&logo=amazondynamodb&logoColor=white)](https://aws.amazon.com/ko/dynamodb/)  
[![Docker Compose](https://img.shields.io/badge/Docker_Compose-2AB4FF.svg?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MjMgNjY1Ij4KICA8cGF0aCBmaWxsPSIjZmNmY2ZjIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00MTggMWMtNiAxLTkgMy0xMyA4LTQgMy00IDMtMTAgMS0xMi02LTYwIDAtNjYgOC01IDYtMTEgNDQtOCA1MGwyMyAxN2M3IDQgNyA2IDIgNy0yMyAzLTM3IDI5LTI5IDUyIDMgOSAzIDktMTAgNi0xOS01LTI0LTYtNDUtNS00NyAwLTg2IDE4LTEwOSA1MGExMzUgMTM1IDAgMCAwLTI0IDY0Yy0zIDI4IDIgNDggMTcgNzJsMjIgMjdjNDAgNDQgNDEgNjYgMyA5MS00NSAzMC0xMDQgMTktMTA2LTIwLTEtMTYgNC0yOSAxNy01MiAxMy0yNCAxNC0zMyAzLTUybDEzLThjMjQtMTIgMjItOSAyMy0zNCAwLTIyIDItMjAtMjMtMzAtMTgtNi0yMC02LTQwLTEtMjggOS00MCAxNC00MSAxOCAwIDItMSAzLTIgMy03IDAtMTQgMTItMTUgMjUtMSAyMSA2IDI5IDMwIDM2IDMwIDkgMzUgMjQgMTkgNDktMzYgNTMtMzIgMTAyIDExIDEyMSAzNSAxNiA3NCAxMyAxMTktOWwxMS01IDMgMzJjMCAzNC00MCAzOC04OSA4bC0xNi0xMGMtNTEtMjktMTAyIDI0LTY2IDcwIDE1IDIwIDQyIDIxIDQ2IDIgMi04IDAtMTEtMTAtMTktMTYtMTItMTctMjQtMi0yNyA1LTEgMjYgOCAyOCAxMmwzNCAyOSAyMCAxMiAyMCA4YzM2IDEzIDgyLTE1IDgyLTUwIDAtMTAgMC0xMCA2LTUgMTAgMTAgMTggMTYgMjMgMTkgNiAzIDYgNCAxIDctNSAyLTUgMi01IDctMSA4IDEgMjkgNCAzMyA0IDcgNjMgNDYgNjkgNDYgMyAwIDQ4LTI1IDUxLTI5IDItMSAzLTM0IDEtMzZsLTE2LTljLTE2LTgtMTYtOC05LTEwIDE5LTcgMzctMjcgNDMtNDdsNS0xYTE2NSAxNjUgMCAwIDAgNjAtMTNjOSAwIDM0LTIyIDQwLTM0bDQtOGM0LTcgNi0yNiA2LTU2IDAtMjkgMS0yNy0xMC0yOS02LTItOC0zLTEzLTgtMzAtMjktNzktMjMtOTYgMTAtMyA3LTMgNy04IDlzLTYgNS01IDE3djE1YzEgMTQgNCAxNiAzNCAyOGwxMiA2YzcgMyA3IDMgMzAtNyA4LTMgOS0zIDkgMS02IDIyLTY0IDQyLTczIDI0YTg3IDg3IDAgMCAwLTYzLTQyYy04IDAtOCAwIDYtMTFhNzM2IDczNiAwIDAgMCA4NS04OWwzLTVjMTktMzEgMjEtNzMgMy0xMDctNy0xNS0yMy0zNS0zNi00OC0zOS0zNi00Ni00Ny0zOC02MiA0LTggMTUtMTcgMjAtMTVhNDUyIDQ1MiAwIDAgMCA1NS0xMmMxMS00IDEzLTUgMTQtMTAgMC00IDItNyA5LTE0IDI0LTI2LTgtODAtNDMtNzFNMjI4IDMzNGMxIDEgMCAxLTEgMS0yMCAwLTI4IDMyLTEyIDQyIDE3IDkgMzctMyAzNy0yMiAwLTctNy0xNy0xMS0xN3YtMWMzLTIgMC0zLTctNGwtNiAxbTU0IDgtNCAxYy0yMiAzLTI1IDM5LTMgNDQgMjQgNSA0MS0yMSAyNS0zOGwtNS0zdi0zYy0xLTItMTQtMy0xMy0xbS00OSAxMjBjLTYgNy05IDE0LTkgMjQgMCA4IDEgMTIgMyA2IDItMTIgOC0yOCAxMy0zM3YtM2MtMSAwLTQgMi03IDZtOTcgNGMwIDIgMjMgMTcgMjcgMTcgMiAwIDEtMy00LTctOS03LTIzLTEzLTIzLTEwbS01NCA2Yy0yMSA1MSAyOSA5NiA3MyA2NyA4LTYgOC03LTEtOC0zOS0zLTYzLTIzLTY2LTU0LTItMTItMy0xMy02LTUiLz4KPC9zdmc+Cg==&style=flat-square&logoColor=black)](https://docs.docker.com/compose/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=Docker&logoColor=white)](https://www.docker.com/)

## Redis Stream → DynamoDB 컨슈머

- Redis Stream 구독 및 메시지 소비
- 파서 전략에 따른 메시지 파싱 (BasicParser, SocketIOParser)
- 프로젝트별 환경 변수 기반 설정 가능
- 파싱된 데이터를 DynamoDB에 저장
- 헬스체크 API 제공 (/health)

## Redis Stream → Elasticsearch 컨슈머

- Redis Stream 구독 및 메시지 소비
- 파서 전략에 따른 메시지 파싱 (BasicParser, SocketIOParser)
- 프로젝트별 환경 변수 기반 설정 가능
- 파싱된 데이터를 Elasticsearch에 인덱싱
- 헬스체크 API 제공 (/health)

## 폴더 구조

```
consumers
├─ docker-compose.yml
├─ package.json
│  └─ package-lock.json
├─ tsconfig.base.json
├─ shared
│  ├─ api
│  │  ├─ index.ts
│  │  ├─ health.service.ts
│  │  ├─ health.controller.ts
│  │  └─ server.ts
│  └─ models
│     ├─ index.ts
│     └─ ChatMessage.ts
├─ source
│  └─ streams
│     └─ src
│        ├─ parsers
│        │  ├─ index.ts
│        │  ├─ interface.ts
│        │  ├─ basic.parser.ts
│        │  └─ socketio.parser.ts
│        └─ stream
│           ├─ index.ts
│           ├─ stream.reader.ts
│           └─ stream.service.ts
└─ sink
   ├─ dynamo-consumer
   │  ├─ .env
   │  ├─ Dockerfile
   │  ├─ package.json
   │  ├─ src
   │  │  ├─ index.ts
   │  │  └─ database
   │  │     ├─ index.ts
   │  │     ├─ dynamo.schemaDefinition.ts
   │  │     └─ dynamo.writer.ts
   │  └─ tsconfig.json
   └─ elasticsearch-consumer
      ├─ .env
      ├─ Dockerfile
      ├─ package.json
      ├─ tsconfig.json
      └─ src
         ├─ index.ts
         └─ database
            ├─ index.ts
            └─ es.writer.ts
```

## 실행방법

### 개발용 실행

```sh
# Redis Streams → DynamoDB 컨슈머
$ npm run start:stream-dynamo

# Redis Streams → Elasticsearch 컨슈머
$ npm run start:stream-elasticsearch
```

### 운영용 실행

```sh
# Redis Streams → DynamoDB 컨슈머 빌드
$ npm run build:stream-dynamo
# Node 실행
$ node dist/sink/dynamo-consumer/src/index

# Redis Streams → Elasticsearch 컨슈머 빌드
$ npm run build:stream-elasticsearch
# Node 실행
$ node dist/sink/elasticsearch-consumer/src/index
```

### 도커 컴포즈

```sh
$ docker-compose up -d
```

### 환경변수

| 프로젝트  | REDIS_STREAM_KEY | REDIS_STREAM_PARSER |
| --------- | ---------------- | ------------------- |
| GraphQL   | message          | basic               |
| Socket.IO | socket.io        | socket.io           |
