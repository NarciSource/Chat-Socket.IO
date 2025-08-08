# Socket.io 채팅 서비스 백엔드

## 🛠️ 기술 스택

[![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=flat-square&logo=socketdotio&logoColor=white)](https://socket.io/)  
[![Redis](https://img.shields.io/badge/Redis-FF4438?style=flat-square&logo=redis&logoColor=white)](https://redis.io)  
[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=nestjs&logoColor=white)](https://nestjs.com/) [![NodeJS](https://img.shields.io/badge/Node.js-6DA55F?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/ko) [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)  
[![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white)](https://eslint.org/) [![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=black)](https://prettier.io/)

## 💡 주요 기능

| 기능 | 설명 | 입력 이벤트 | 응답 이벤트 |
| --- | --- | --- | --- |
| 사용자 등록 | 유저ID &harr; 소켓ID 매핑 | emit("register", userId) | on("system", content) |
| 방 생성 | 방 객체 생성 &rarr; 참가자 초대 이벤트 발생 | emit("create_room", <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [hostId, participants]) | on("room_created", <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [roomId, participants]) |
| 방 참가 | 방에 사용자 추가 &rarr; 참가 완료 알림 | emit("join_room", <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [userId, roomId]) | on("system", content) |
| 방 떠나기 | 방에서 사용자 제거 &rarr; 떠남 알림 | emit("leave_room", <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [userId, roomId]) | on("system", content) |
| 메시지 교환 | 방에서 메시지 중계 | emit("send_message", <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [roomId, senderId, content] ) | on("receive_message", <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [senderId, roomId, content]) |
| 타이핑 알림 | 방에서 타이핑 이벤트 중계 | emit("typing", <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [roomId, userId]) | on("typing", userId) |

## 📐 시퀀스 다이어그램

```mermaid
sequenceDiagram
    participant Web1
    participant Web2
    participant Server
    participant Room
    participant DB

    %% 1. 연결 단계
    Web1 ->> Server: connect() (WebSocket handshake)
    activate Server
    Web2 ->> Server: connect() (WebSocket handshake)
    Server -->> Web1: connection established (ack)
    Server -->> Web2: connection established (ack)

    %% 2. 연결 성공 시 동작
    opt connection established
      %% 2-1. 사용자 등록
      Web1 ->> Server: emit("register", id)

      %% 데이터베이스 저장
      Server ->> DB: [id, socketId]
      activate DB
      deactivate DB

      %% 2-2. 여러 방 생성 시나리오
      loop For each room
        Web1 ->> Server: emit("create_room", [hostId, participants])

        %% 데이터베이스 저장
        Server ->> DB: [roomId, members]
        activate DB
        deactivate DB

        Server ->> Room: new Room(roomId)

        activate Room
        Server -->> Web1: on("room_created", roomId)
        Server -->> Web2: on("room_invite", roomId)

        %% 2-3. 방 참가
        Web2 ->> Server: emit("join_room", roomId)
        Server ->> Room: add(Web2)
        Room -->> Web2: on("joined_room", roomId)

        %% 2-4. 방 내 메시지 교환 & 타이핑 알림
        loop Multiple events
          Web1 ->> Room: emit("send_message", message)

          %% 데이터베이스 저장
          Room ->> DB: message
          activate DB
          deactivate DB

          note over Room: Message and typing events exchange
          Room ->> Room: broadcast
          Room -->> Web2: on("new_message", message)

          Web1 ->> Room: emit("typing")
          Room -->> Web2: on("typing", who)
        end

        deactivate Room
      end

      %% 2-5. 연결 종료 시 DB 반영
      Web2 ->> Server: disconnect()
      Web1 ->> Server: disconnect()

      Server ->> DB: remove/update socketId
      activate DB
      deactivate DB
    end

    deactivate Server
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
│  │  └─ redis.module.ts
│  ├─ core
│  │  ├─ controller.ts
│  │  ├─ gateway.ts
│  │  └─ module.ts
│  ├─ domain
│  │  ├─ user
│  │  │  ├─ controller.ts
│  │  │  ├─ gateway.ts
│  │  │  └─ service.ts
│  │  ├─ chat
│  │  │  └─ gateway.ts
│  │  └─ room
│  │     ├─ gateway.ts
│  │     └─ service.ts
│  └─ repository
│     ├─ interface.ts
│     ├─ module.ts
│     ├─ redis.ts
│     └─ simple.ts
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
  --env-file ./.env \
  -p ${REDIS_PORT}:6379 \
  redis:latest

$ npm install
$ npm run start
```
