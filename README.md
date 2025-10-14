# 인프라

인프라 구성 요소를 관리합니다.  
Docker Compose를 사용해 Redis, DynamoDB, Elasticsearch, Kong 등 주요 서비스를 컨테이너로 띄우고,  
각 서비스의 설정 파일과 스크립트도 함께 관리합니다.

## 기술 스택

[![Lua](https://img.shields.io/badge/Lua-000080?style=flat-square&logo=lua&logoColor=white)](https://www.scala-lang.org/)
[![Bash](https://img.shields.io/badge/Bash-4EAA25?style=flat-square&logo=gnubash&logoColor=white)](https://www.scala-lang.org/)
[![Json](https://img.shields.io/badge/Json-000000?style=flat-square&logo=json&logoColor=white)](https://www.scala-lang.org/)  
[![Redis](https://img.shields.io/badge/Redis-FF4438?style=flat-square&logo=redis&logoColor=white)](https://redis.io)
[![DynamoDB](https://img.shields.io/badge/DynamoDB-4053D6?style=flat-square&logo=amazondynamodb&logoColor=white)](https://aws.amazon.com/ko/dynamodb/)
[![Elasticsearch](https://img.shields.io/badge/Elasticsearch-005571?style=flat-square&logo=elasticsearch&logoColor=white)](https://www.elastic.co/kr/elasticsearch)  
[![Kong](https://img.shields.io/badge/Kong-003459?style=flat-square&logo=kong&logoColor=white)](https://konghq.com/ko-kr)
[![NGINX](https://img.shields.io/badge/NGINX-009639?style=flat-square&logo=nginx&logoColor=white)](https://nginx.org/)  
[![Docker Compose](https://img.shields.io/badge/Docker_Compose-2AB4FF.svg?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MjMgNjY1Ij4KICA8cGF0aCBmaWxsPSIjZmNmY2ZjIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00MTggMWMtNiAxLTkgMy0xMyA4LTQgMy00IDMtMTAgMS0xMi02LTYwIDAtNjYgOC01IDYtMTEgNDQtOCA1MGwyMyAxN2M3IDQgNyA2IDIgNy0yMyAzLTM3IDI5LTI5IDUyIDMgOSAzIDktMTAgNi0xOS01LTI0LTYtNDUtNS00NyAwLTg2IDE4LTEwOSA1MGExMzUgMTM1IDAgMCAwLTI0IDY0Yy0zIDI4IDIgNDggMTcgNzJsMjIgMjdjNDAgNDQgNDEgNjYgMyA5MS00NSAzMC0xMDQgMTktMTA2LTIwLTEtMTYgNC0yOSAxNy01MiAxMy0yNCAxNC0zMyAzLTUybDEzLThjMjQtMTIgMjItOSAyMy0zNCAwLTIyIDItMjAtMjMtMzAtMTgtNi0yMC02LTQwLTEtMjggOS00MCAxNC00MSAxOCAwIDItMSAzLTIgMy03IDAtMTQgMTItMTUgMjUtMSAyMSA2IDI5IDMwIDM2IDMwIDkgMzUgMjQgMTkgNDktMzYgNTMtMzIgMTAyIDExIDEyMSAzNSAxNiA3NCAxMyAxMTktOWwxMS01IDMgMzJjMCAzNC00MCAzOC04OSA4bC0xNi0xMGMtNTEtMjktMTAyIDI0LTY2IDcwIDE1IDIwIDQyIDIxIDQ2IDIgMi04IDAtMTEtMTAtMTktMTYtMTItMTctMjQtMi0yNyA1LTEgMjYgOCAyOCAxMmwzNCAyOSAyMCAxMiAyMCA4YzM2IDEzIDgyLTE1IDgyLTUwIDAtMTAgMC0xMCA2LTUgMTAgMTAgMTggMTYgMjMgMTkgNiAzIDYgNCAxIDctNSAyLTUgMi01IDctMSA4IDEgMjkgNCAzMyA0IDcgNjMgNDYgNjkgNDYgMyAwIDQ4LTI1IDUxLTI5IDItMSAzLTM0IDEtMzZsLTE2LTljLTE2LTgtMTYtOC05LTEwIDE5LTcgMzctMjcgNDMtNDdsNS0xYTE2NSAxNjUgMCAwIDAgNjAtMTNjOSAwIDM0LTIyIDQwLTM0bDQtOGM0LTcgNi0yNiA2LTU2IDAtMjkgMS0yNy0xMC0yOS02LTItOC0zLTEzLTgtMzAtMjktNzktMjMtOTYgMTAtMyA3LTMgNy04IDlzLTYgNS01IDE3djE1YzEgMTQgNCAxNiAzNCAyOGwxMiA2YzcgMyA3IDMgMzAtNyA4LTMgOS0zIDkgMS02IDIyLTY0IDQyLTczIDI0YTg3IDg3IDAgMCAwLTYzLTQyYy04IDAtOCAwIDYtMTFhNzM2IDczNiAwIDAgMCA4NS04OWwzLTVjMTktMzEgMjEtNzMgMy0xMDctNy0xNS0yMy0zNS0zNi00OC0zOS0zNi00Ni00Ny0zOC02MiA0LTggMTUtMTcgMjAtMTVhNDUyIDQ1MiAwIDAgMCA1NS0xMmMxMS00IDEzLTUgMTQtMTAgMC00IDItNyA5LTE0IDI0LTI2LTgtODAtNDMtNzFNMjI4IDMzNGMxIDEgMCAxLTEgMS0yMCAwLTI4IDMyLTEyIDQyIDE3IDkgMzctMyAzNy0yMiAwLTctNy0xNy0xMS0xN3YtMWMzLTIgMC0zLTctNGwtNiAxbTU0IDgtNCAxYy0yMiAzLTI1IDM5LTMgNDQgMjQgNSA0MS0yMSAyNS0zOGwtNS0zdi0zYy0xLTItMTQtMy0xMy0xbS00OSAxMjBjLTYgNy05IDE0LTkgMjQgMCA4IDEgMTIgMyA2IDItMTIgOC0yOCAxMy0zM3YtM2MtMSAwLTQgMi03IDZtOTcgNGMwIDIgMjMgMTcgMjcgMTcgMiAwIDEtMy00LTctOS03LTIzLTEzLTIzLTEwbS01NCA2Yy0yMSA1MSAyOSA5NiA3MyA2NyA4LTYgOC03LTEtOC0zOS0zLTYzLTIzLTY2LTU0LTItMTItMy0xMy02LTUiLz4KPC9zdmc+Cg==&style=flat-square&logoColor=black)](https://docs.docker.com/compose/)

## 인프라 서비스

| 서비스                 | 역할                                 | 포트                                          | 초기화/설정                                    | 데이터 저장 위치 |
| ---------------------- | ------------------------------------ | --------------------------------------------- | ---------------------------------------------- | ---------------- |
| **Redis**              | 인메모리 저장소<br/> 이벤트 스트림즈 | `${REDIS_PORT}`                               | -                                              | `redis-data`     |
| **DynamoDB**           | 영구 데이터 저장                     | `${DYNAMO_PORT}`                              | `dynamo/init/create_schema.sh`                 | `dynamodb-data`  |
| **Elasticsearch**      | 색인 및 검색                         | `${ES_PORT}`                                  | `elasticsearch/init/create_index_templates.sh` | `es-data`        |
| **Kibana**             | Elasticsearch UI                     | `${KB_PORT}`                                  | -                                              | -                |
| **Kong**               | API Gateway                          | `${SERVER_PORT}`, `${API_GATEWAY_ADMIN_PORT}` | `kong/kong.conf`, `kong/kong.yml`              | -                |
| **Konga**              | Kong 관리 UI                         | `${API_GATEWAY_UI_PORT}`                      | `kong/konga/seeds`                             | `konga-data`     |
| **dynamodb-init**      | 초기 테이블 스키마 등록              | -                                             | `dynamo/create_schema.sh`                      | -                |
| **elasticsearch-init** | 초기 인덱스 템플릿 등록              | -                                             | `elasticsearch/init/create_index_templates.sh` | -                |

## 폴더 구조

```
infra
├─ dynamo
│  ├─ schema # DynamoDB 테이블 스키마
│  │  └─ chat-messages-schema.json
│  └─ create_schema.sh # 스키마 실행 스크립트
├─ elasticsearch
│  ├─ templates # Elasticsearch 인덱스 템플릿
│  │  └─ chat-messages-template.json
│  └─ create_index_templates.sh # 인덱스 템플릿 등록 스크립트
├─ kong # API Gateway
│  ├─ kong.conf # Kong 설정 파일
│  ├─ kong.yml # Declarative 설정 파일
│  ├─ plugins # 플러그인 등록
│  │  └─ custom-field-log
│  │     ├─ schema.lua # 플러그인 설정 스키마
│  │     └─ handler.lua # 플러그인 동작 구현
│  └─ konga # Kong UI
│     └─ seeds # 초기값 세팅
│        ├─ user_seed.json # 관리자 계정 생성
│        └─ kong_node_seed.json # Kong 인스턴스 연결 등록
├─ nginx # 라우팅 프록시
│  └─ nginx.conf # NGINX 설정
├─ docker-compose.yml # 도커컴포즈
└─ README.md
```
