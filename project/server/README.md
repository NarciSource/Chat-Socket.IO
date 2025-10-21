# Socket.io 채팅 서비스 백엔드

## 🛠️ 기술 스택

[![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=flat-square&logo=socketdotio&logoColor=white)](https://socket.io/)  
[![Redis](https://img.shields.io/badge/Redis-FF4438?style=flat-square&logo=redis&logoColor=white)](https://redis.io)
[![DynamoDB](https://img.shields.io/badge/DynamoDB-4053D6?style=flat-square&logo=amazondynamodb&logoColor=white)](https://aws.amazon.com/ko/dynamodb/)
[![Elasticsearch](https://img.shields.io/badge/ElasticSearch-005571?style=flat-square&logo=elasticsearch&logoColor=white)](https://www.elastic.co/kr/elasticsearch)  
[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=nestjs&logoColor=white)](https://nestjs.com/) [![NodeJS](https://img.shields.io/badge/Node.js-6DA55F?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/ko) [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)  
[![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white)](https://eslint.org/) [![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=black)](https://prettier.io/)

## 💡 주요 기능

| 기능 | 설명 | 입력 이벤트 | 응답 이벤트 |
| --- | --- | --- | --- |
| 사용자 등록 | 유저ID &harr; 소켓ID 매핑 | emit("register", userId) | on("system", content) |
| 방 생성 | 방 객체 생성 &rarr; 참가자 초대 이벤트 발생 | emit("create_room", <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [hostId, participants]) | on("room_created", <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [roomId, participants]) |
| 방 참가 | 방에 사용자 추가 &rarr; 참가 완료 알림 | emit("join_room", <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [userId, roomId]) | on("system", content) |
| 방 떠나기 | 방에서 사용자 제거 &rarr; 떠남 알림 | emit("leave_room", <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [userId, roomId]) | on("system", content) |
| 메시지 교환 | 방에서 메시지 중계 | emit("send_message", <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [roomId, userId, content] ) | on("receive_message", <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [userId, roomId, content]) |
| 타이핑 알림 | 방에서 타이핑 이벤트 중계 | emit("typing", <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [roomId, userId]) | on("typing", userId) |
| 메시지 기록 <br>불러오기 | 방 참가 전 메시지 기록 불러오기 |  | on("receive_messages", roomId) |
| 메시지 검색 | 키워드로 메시지 기록 불러오기 | search(keyword) |  |

## 📐 시퀀스 다이어그램

```mermaid
sequenceDiagram
  %% Participants
  participant Web1
  participant Web2
  participant APIGateway@{ "type" : "queue" }
  participant Servers@{ "type" : "collections" }
  participant RedisStore@{ "type": "database" }
  participant RedisStreams@{ "type" : "queue" }
  participant DynamoDB@{ "type" : "database" }
  participant Elasticsearch@{ "type" : "database"}

  %% 1. 연결 단계
  Web1 ->> APIGateway: connect() (WebSocket handshake)
  Web2 ->> APIGateway: connect() (WebSocket handshake)

  %% APIGateway 로드밸런싱
  APIGateway -->> APIGateway: LoadBalance
  APIGateway ->> Servers: forward connect()

  activate Servers

  Servers ->> RedisStreams: publish session
  RedisStreams -->> Servers: subscribe session (replicas)
  Servers -->> APIGateway: connection established (ack)
  APIGateway -->> Web1: connection established (ack)
  APIGateway -->> Web2: connection established (ack)

  %% 2. 연결 성공 시 동작
  opt connection established
    %% 2-1. 사용자 등록
    Web1 ->> APIGateway: emit("register", id)
    APIGateway ->> Servers: forward emit("register", id)

    %% 데이터베이스 저장
    Servers ->> RedisStore: [id, socketId]
    activate RedisStore
    deactivate RedisStore

    %% 3. 여러 방 생성 시나리오
    loop For each room
      rect rgb(191, 223, 255, 0.7)
        Web1 ->> APIGateway: emit("create_room", [hostId, participants])
        APIGateway ->> Servers: forward emit("create_room", ...)

        %% 데이터베이스 저장
        Servers ->> RedisStore: [roomId, members]
        activate RedisStore
        deactivate RedisStore

        Servers -->> Web1: on("room_created", roomId)
        Servers -->> Web2: on("room_invite", roomId)

        opt room created
          %% 3-1. 방 참가
          Web2 ->> APIGateway: emit("join_room", roomId)
          APIGateway ->> Servers: forward emit("join_room", roomId)
          Servers -->> Web2: on("joined_room", roomId)

          %% 메시지 기록 불러오기
          Servers ->> DynamoDB: getMessageHistory
          DynamoDB -->> Servers: MessageHistory
          Servers -->> Web2: on("receive_messages", roomId)
        end
      end

      %% 4. 메시지 교환 & 타이핑 알림
      rect rgb(233, 191, 201, 0.7)
        loop Multiple events
          Web1 ->> APIGateway: emit("typing")
          Web1 ->> APIGateway: emit("send_message", message)
          APIGateway ->> Servers: forward emit("send_message", message)

          %% RedisStreams Pub/Sub로 이벤트/세션 동기화
          note over Servers: Message and typing events exchange
          Servers ->> RedisStreams: publish message

          %% 4-1. 영속성 저장
          par Synchronization
            RedisStreams ->> DynamoDB: store message
          and Persistence
            RedisStreams -->> Servers: subscribe message
          end

          par
            Servers -->> Web2: on("typing", who)
          and
            Servers -->> Web2: on("receive_message", message)
          end
        end
      end
    end

    rect rgba(155, 198, 142, 0.7)
      Web2 ->> APIGateway: search(keyword)
      APIGateway ->> Servers: forword
      Servers ->> Elasticsearch: searchByKeyword
      Elasticsearch -->> Servers: Messages
      Servers -->> APIGateway: Messages
      APIGateway -->> Web2: Messages
    end
  end

  %% 5. 연결 종료
  Web2 ->> APIGateway: disconnect()
  Web1 ->> APIGateway: disconnect()
  APIGateway ->> Servers: forward disconnect()

  Servers ->> RedisStore: remove/update socketId
  activate RedisStore
  deactivate RedisStore

  deactivate Servers
```

## 📂 폴더 구조

<details>
<summary>열기</summary>

```
server
├─ .env
├─ src
│  ├─ main.ts
│  ├─ common
│  │  ├─ symbols.ts
│  │  ├─ redis
│  │  │  ├─ index.ts
│  │  │  ├─ module.ts
│  │  │  ├─ adapters
│  │  │  │  └─ RedisIoAdapter.ts
│  │  │  └─ providers
│  │  │     ├─ index.ts
│  │  │     ├─ db.provider.ts
│  │  │     ├─ pubsubAdapter.provider.ts
│  │  │     └─ streamsAdapter.provider.ts
│  │  ├─ dynamo
│  │  │  ├─ index.ts
│  │  │  ├─ module.ts
│  │  │  └─ provider.ts
│  │  └─ es
│  │     ├─ index.ts
│  │     ├─ module.ts
│  │     └─ provider.ts
│  ├─ core
│  │  ├─ module.ts
│  │  ├─ eventRegistry.ts
│  │  ├─ controller.ts
│  │  └─ gateway.ts
│  ├─ model
│  │  ├─ Message.ts
│  │  ├─ Room.ts
│  │  └─ schemaDefinition.ts
│  ├─ domain
│  │  ├─ shared
│  │  │  └─ events
│  │  │     ├─ index.ts
│  │  │     ├─ Sync.event.ts
│  │  │     │  └─ Sync.handler.ts
│  │  │     └─ Emit.event.ts
│  │  │        └─ Emit.handler.ts
│  │  ├─ user
│  │  │  ├─ index.ts
│  │  │  ├─ module.ts
│  │  │  ├─ controller.ts
│  │  │  ├─ gateway.ts
│  │  │  ├─ queries
│  │  │  │  ├─ index.ts
│  │  │  │  ├─ GetSocketId.query.ts
│  │  │  │  │  └─ GetSocketId.handler.ts
│  │  │  │  └─ GetUser.query.ts
│  │  │  │     └─ GetUser.handler.ts
│  │  │  └─ commands
│  │  │     ├─ index.ts
│  │  │     ├─ RegisterUser.command.ts
│  │  │     │  └─ RegisterUser.handler.ts
│  │  │     └─ DisconnectUser.command.ts
│  │  │        └─ DisconnectUser.handler.ts
│  │  ├─ chat
│  │  │  ├─ index.ts
│  │  │  ├─ controllers.ts
│  │  │  ├─ gateway.ts
│  │  │  ├─ module.ts
│  │  │  └─ queries
│  │  │     ├─ index.ts
│  │  │     ├─ GetMessageHistory.query.ts
│  │  │     │  └─ GetMessageHistory.handler.ts
│  │  │     └─ SearchMessages.query.ts
│  │  │        └─ SearchMessages.handler.ts
│  │  └─ room
│  │     ├─ index.ts
│  │     ├─ gateway.ts
│  │     ├─ module.ts
│  │     ├─ queries
│  │     │  ├─ index.ts
│  │     │  └─ GetRoomsByUser.query.ts
│  │     │     └─ GetRoomsByUser.handler.ts
│  │     ├─ commands
│  │     │  ├─ index.ts
│  │     │  ├─ CreateRoom.command.ts
│  │     │  │  └─ CreateRoom.handler.ts
│  │     │  ├─ JoinRoom.command.ts
│  │     │  │  └─ JoinRoom.handler.ts
│  │     │  └─ LeaveRoom.command.ts
│  │     │     └─ LeaveRoom.handler.ts
│  │     └─ events
│  │        ├─ index.ts
│  │        ├─ CreatedRoom.event.ts
│  │        │  └─ CreatedRoom.handler.ts
│  │        ├─ JoinedRoom.event.ts
│  │        │  └─ JoinedRoom.handler.ts
│  │        └─ LeavedRoom.event.ts
│  │           └─ LeavedRoom.handler.ts
│  └─ repository
│     ├─ index.ts
│     ├─ module.ts
│     └─ interface.ts
│        ├─ InMemoryRepository.ts
│        └─ DatabaseRepository.ts
├─ docker-compose.yml
│  ├─ Dockerfile
│  └─ .dockerignore
├─ nest-cli.json
├─ package.json
│  └─ package-lock.json
├─ tsconfig.json
│  └─ tsconfig.build.json
└─ eslint.config.mjs
   └─ .prettierrc
```

</details>

## 🚀 실행 방법

```sh
$ docker run -d \
  --name redis-container \
  --env-file .env \
  -p ${REDIS_PORT}:6379 \
  redis:8.2.1

$ docker run -d \
  --name dynamodb-container \
  --env-file .env \
  -p ${DYNAMO_PORT}:8000 \
  amazon/dynamodb-local:3.1.0

$ docker run -d \
  --name es-container \
  --env-file .env \
  -p ${ES_PORT}:9200 \
  docker.elastic.co/elasticsearch/elasticsearch:9.2.0

$ docker build \
  -f Dockerfile \
  -t chat/server:latest \
  .

$ docker run -d \
  --name chat/server \
  --env-file .env \
  -p 3000:3000
  chat/server:latest
```
