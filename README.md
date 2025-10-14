# 채팅 서비스 컨슈머

## 기술 스택

[![Scala](https://img.shields.io/badge/Scala-DC322F?style=flat-square&logo=scala&logoColor=white)](https://www.scala-lang.org/)  
[![Redis](https://img.shields.io/badge/Redis-FF4438?style=flat-square&logo=redis&logoColor=white)](https://redis.io)
[![DynamoDB](https://img.shields.io/badge/DynamoDB-4053D6?style=flat-square&logo=amazondynamodb&logoColor=white)](https://aws.amazon.com/ko/dynamodb/)
[![Elasticsearch](https://img.shields.io/badge/ElasticSearch-005571?style=flat-square&logo=elasticsearch&logoColor=white)](https://www.elastic.co/kr/elasticsearch)  
[![Docker Compose](https://img.shields.io/badge/Docker_Compose-2AB4FF.svg?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MjMgNjY1Ij4KICA8cGF0aCBmaWxsPSIjZmNmY2ZjIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00MTggMWMtNiAxLTkgMy0xMyA4LTQgMy00IDMtMTAgMS0xMi02LTYwIDAtNjYgOC01IDYtMTEgNDQtOCA1MGwyMyAxN2M3IDQgNyA2IDIgNy0yMyAzLTM3IDI5LTI5IDUyIDMgOSAzIDktMTAgNi0xOS01LTI0LTYtNDUtNS00NyAwLTg2IDE4LTEwOSA1MGExMzUgMTM1IDAgMCAwLTI0IDY0Yy0zIDI4IDIgNDggMTcgNzJsMjIgMjdjNDAgNDQgNDEgNjYgMyA5MS00NSAzMC0xMDQgMTktMTA2LTIwLTEtMTYgNC0yOSAxNy01MiAxMy0yNCAxNC0zMyAzLTUybDEzLThjMjQtMTIgMjItOSAyMy0zNCAwLTIyIDItMjAtMjMtMzAtMTgtNi0yMC02LTQwLTEtMjggOS00MCAxNC00MSAxOCAwIDItMSAzLTIgMy03IDAtMTQgMTItMTUgMjUtMSAyMSA2IDI5IDMwIDM2IDMwIDkgMzUgMjQgMTkgNDktMzYgNTMtMzIgMTAyIDExIDEyMSAzNSAxNiA3NCAxMyAxMTktOWwxMS01IDMgMzJjMCAzNC00MCAzOC04OSA4bC0xNi0xMGMtNTEtMjktMTAyIDI0LTY2IDcwIDE1IDIwIDQyIDIxIDQ2IDIgMi04IDAtMTEtMTAtMTktMTYtMTItMTctMjQtMi0yNyA1LTEgMjYgOCAyOCAxMmwzNCAyOSAyMCAxMiAyMCA4YzM2IDEzIDgyLTE1IDgyLTUwIDAtMTAgMC0xMCA2LTUgMTAgMTAgMTggMTYgMjMgMTkgNiAzIDYgNCAxIDctNSAyLTUgMi01IDctMSA4IDEgMjkgNCAzMyA0IDcgNjMgNDYgNjkgNDYgMyAwIDQ4LTI1IDUxLTI5IDItMSAzLTM0IDEtMzZsLTE2LTljLTE2LTgtMTYtOC05LTEwIDE5LTcgMzctMjcgNDMtNDdsNS0xYTE2NSAxNjUgMCAwIDAgNjAtMTNjOSAwIDM0LTIyIDQwLTM0bDQtOGM0LTcgNi0yNiA2LTU2IDAtMjkgMS0yNy0xMC0yOS02LTItOC0zLTEzLTgtMzAtMjktNzktMjMtOTYgMTAtMyA3LTMgNy04IDlzLTYgNS01IDE3djE1YzEgMTQgNCAxNiAzNCAyOGwxMiA2YzcgMyA3IDMgMzAtNyA4LTMgOS0zIDkgMS02IDIyLTY0IDQyLTczIDI0YTg3IDg3IDAgMCAwLTYzLTQyYy04IDAtOCAwIDYtMTFhNzM2IDczNiAwIDAgMCA4NS04OWwzLTVjMTktMzEgMjEtNzMgMy0xMDctNy0xNS0yMy0zNS0zNi00OC0zOS0zNi00Ni00Ny0zOC02MiA0LTggMTUtMTcgMjAtMTVhNDUyIDQ1MiAwIDAgMCA1NS0xMmMxMS00IDEzLTUgMTQtMTAgMC00IDItNyA5LTE0IDI0LTI2LTgtODAtNDMtNzFNMjI4IDMzNGMxIDEgMCAxLTEgMS0yMCAwLTI4IDMyLTEyIDQyIDE3IDkgMzctMyAzNy0yMiAwLTctNy0xNy0xMS0xN3YtMWMzLTIgMC0zLTctNGwtNiAxbTU0IDgtNCAxYy0yMiAzLTI1IDM5LTMgNDQgMjQgNSA0MS0yMSAyNS0zOGwtNS0zdi0zYy0xLTItMTQtMy0xMy0xbS00OSAxMjBjLTYgNy05IDE0LTkgMjQgMCA4IDEgMTIgMyA2IDItMTIgOC0yOCAxMy0zM3YtM2MtMSAwLTQgMi03IDZtOTcgNGMwIDIgMjMgMTcgMjcgMTcgMiAwIDEtMy00LTctOS03LTIzLTEzLTIzLTEwbS01NCA2Yy0yMSA1MSAyOSA5NiA3MyA2NyA4LTYgOC03LTEtOC0zOS0zLTYzLTIzLTY2LTU0LTItMTItMy0xMy02LTUiLz4KPC9zdmc+Cg==&style=flat-square&logoColor=black)](https://docs.docker.com/compose/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=Docker&logoColor=white)](https://www.docker.com/)

## 컨슈머

### Redis Streams → DynamoDB 컨슈머

- Redis Streams 구독 및 메시지 소비
- 파서 전략에 따른 메시지 파싱 (BasicParser, SocketIOParser)
- 프로젝트별 환경 변수 기반 설정 가능
- 파싱된 데이터를 DynamoDB에 저장
- 헬스체크 API 제공 (/health)

### Redis Streams → Elasticsearch 컨슈머

- Redis Streams 구독 및 메시지 소비
- 파서 전략에 따른 메시지 파싱 (BasicParser, SocketIOParser)
- 프로젝트별 환경 변수 기반 설정 가능
- 파싱된 데이터를 Elasticsearch에 인덱싱
- 헬스체크 API 제공 (/health)

## 폴더 구조

```python
consumers
├─ .env
├─ .scalafmt.conf # 코드 포맷 설정
├─ build.sbt # 프로젝트 설정
├─ assembly.sbt # sbt-assembly 플러그인 설정
├─ docker-compose.yml
├─ project
│  ├─ build.properties # sbt 버전
│  ├─ Dependencies.scala # 의존성 버전 및 그룹화 관리
│  └─ plugins.sbt # 빌드 플러그인 등록
├─ shared # 공용
│  └─ src/main/scala
│     ├─ config
│     │  └─ Env.scala
│     ├─ api
│     │  └─ HealthServer.scala
│     └─ model
│        └─ ChatMessage.scala
├─ source # 컨슈머 입력단
│  └─ streams
│     └─ src/main/scala
│        ├─ parser
│        │  ├─ IStreamParser.scala
│        │  ├─ BasicParser.scala
│        │  └─ SocketIOParser.scala
│        ├─ service
│        │  └─ StreamService.scala
│        └─ StreamReader.scala
└─ sink # 컨슈머 출력단
   ├─ dynamo-consumer
   │  ├─ Dockerfile
   │  │  └─ .dockerignore
   │  └─ src/main/scala
   │     ├─ database
   │     │  ├─ DynamoMappable.scala
   │     │  └─ DynamoWriter.scala
   │     └─ Main.scala
   └─ elasticsearch-consumer
      ├─ Dockerfile
      │  └─ .dockerignore
      └─ src/main/scala
         ├─ database
         │  ├─ Indexables.scala
         │  └─ ESWriter.scala
         └─ Main.scala
```

## 실행방법

### 환경변수

| 프로젝트  | REDIS_STREAMS_KEY | REDIS_STREAMS_PARSER |
| --------- | ----------------- | -------------------- |
| GraphQL   | message           | basic                |
| Socket.IO | socket.io         | socket.io            |

### 개발용 실행

```sh
# Redis Streams → DynamoDB 컨슈머
$ sbt "project dynamoSink" run

# Redis Streams → Elasticsearch 컨슈머
$ sbt "project esSink" run
```

### 운영용 실행

```sh
# Redis Streams → DynamoDB 컨슈머 빌드
$ sbt "project dynamoSink" assembly
# JAR 실행
$ java -jar target/streams-dynamo-consumer.jar

# Redis Streams → Elasticsearch 컨슈머 빌드
$ sbt "project esSink" assembly
# JAR 실행
$ java -jar target/streams-elasticsearch-consumer.jar
```

### 도커 컴포즈

```sh
$ docker-compose up -d
```
