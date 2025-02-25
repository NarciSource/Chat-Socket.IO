# 채팅 마이크로 프론트엔드

> Single-Spa Application 구성

## 🚩 목차

- [🛠️ 기술 스택](#️-기술-스택)
- [🎥 데모](#-데모)
- [💡 주요 기능](#-주요-기능)
- [🧩 컴포넌트 구성](#-컴포넌트-구성)
- [🚀 실행 방법](#-실행-방법)
- [📂 폴더 구조](#-폴더-구조)

## 🛠️ 기술 스택

[![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=flat-square&logo=socketdotio&logoColor=white)](https://socket.io/)  
[![Vuejs](https://img.shields.io/badge/Vue.js-4FC08D?style=flat-square&logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![Pinia](https://img.shields.io/badge/🍍_Pinia-FFD859?style=flat-square&logoColor=white)](https://pinia.vuejs.org/)
[![Quasar](https://img.shields.io/badge/Quasar-050A14?style=flat-square&logo=quasar&logoColor=white)](https://quasar.dev/)  
[![Single-SPA](https://img.shields.io/badge/Single_SPA-gray.svg?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MDAgODExLjIxIj48c2NyaXB0IHhtbG5zPSIiIGlkPSJjdXN0b20tdXNlcmFnZW50LXN0cmluZy1wYWdlLXNjcmlwdCIvPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDojZWU2ODlmO308L3N0eWxlPjwvZGVmcz48ZyBpZD0iTGF5ZXJfMiIgZGF0YS1uYW1lPSJMYXllciAyIj48ZyBpZD0iTGF5ZXJfMS0yIiBkYXRhLW5hbWU9IkxheWVyIDEiPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTEwOC41NCwyMDAuMzMsNTI4LjQyLDQ3MC40Miw0NDkuMjcsNTgzLjg0LDU5LjM5LDM4Ni4yMmw0OS4xNS0xODUuODlNNzcuNCwxMjAuMTIsMCw0MTIuODZsNDY1LjYxLDIzNkw2MDAsNDU2LjI4LDc3LjQsMTIwLjEyWiIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMSIgcG9pbnRzPSIyODQuODQgNTU2LjM0IDQ2NS42IDY0OC44NSAxNTQuNjkgODExLjIxIDI4NC44NCA1NTYuMzQiLz48cG9seWdvbiBjbGFzcz0iY2xzLTEiIHBvaW50cz0iNDAxLjA2IDMyOC44NSA3Ny40IDEyMC4xMiA1NjkuMDkgMCA0MDEuMDYgMzI4Ljg1Ii8+PC9nPjwvZz48L3N2Zz4=&style=flat-square&logoColor)](https://single-spa.js.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)](https://ko.vite.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)  
[![Steiger](https://img.shields.io/badge/FSD_Steiger-211b1d.svg?logo=data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiPgo8cGF0aCBkPSJNMCAwIEMyOC4zOCAwIDU2Ljc2IDAgODYgMCBDODYgMy42MyA4NiA3LjI2IDg2IDExIEM1Ny42MiAxMSAyOS4yNCAxMSAwIDExIEMwIDcuMzcgMCAzLjc0IDAgMCBaICIgZmlsbD0iI0VCRUFFQSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTcsMTAyKSIvPgo8cGF0aCBkPSJNMCAwIEMyOC4zOCAwIDU2Ljc2IDAgODYgMCBDODYgMy42MyA4NiA3LjI2IDg2IDExIEM1Ny42MiAxMSAyOS4yNCAxMSAwIDExIEMwIDcuMzcgMCAzLjc0IDAgMCBaICIgZmlsbD0iI0VCRUFFQSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTcsODcpIi8+CjxwYXRoIGQ9Ik0wIDAgQzI4LjM4IDAgNTYuNzYgMCA4NiAwIEM4NiAzLjYzIDg2IDcuMjYgODYgMTEgQzU3LjYyIDExIDI5LjI0IDExIDAgMTEgQzAgNy4zNyAwIDMuNzQgMCAwIFogIiBmaWxsPSIjRUJFQUVBIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1Nyw1NykiLz4KPHBhdGggZD0iTTAgMCBDMjguMzggMCA1Ni43NiAwIDg2IDAgQzg2IDMuNjMgODYgNy4yNiA4NiAxMSBDNTcuNjIgMTEgMjkuMjQgMTEgMCAxMSBDMCA3LjM3IDAgMy43NCAwIDAgWiAiIGZpbGw9IiNFQkVBRUEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDU3LDQyKSIvPgo8cGF0aCBkPSJNMCAwIEMxMy41MyAwIDI3LjA2IDAgNDEgMCBDNDEgMy42MyA0MSA3LjI2IDQxIDExIEMyNy40NyAxMSAxMy45NCAxMSAwIDExIEMwIDcuMzcgMCAzLjc0IDAgMCBaICIgZmlsbD0iI0U5RThFOCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTcsMTQ3KSIvPgo8cGF0aCBkPSJNMCAwIEMxMy41MyAwIDI3LjA2IDAgNDEgMCBDNDEgMy42MyA0MSA3LjI2IDQxIDExIEMyNy40NyAxMSAxMy45NCAxMSAwIDExIEMwIDcuMzcgMCAzLjc0IDAgMCBaICIgZmlsbD0iI0U5RThFOCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTcsMTMyKSIvPgo8cGF0aCBkPSJNMCAwIEMxMy41MyAwIDI3LjA2IDAgNDEgMCBDNDEgMy42MyA0MSA3LjI2IDQxIDExIEMyNy40NyAxMSAxMy45NCAxMSAwIDExIEMwIDcuMzcgMCAzLjc0IDAgMCBaICIgZmlsbD0iI0U5RThFOCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTcsMTE3KSIvPgo8cGF0aCBkPSJNMCAwIEMxMy41MyAwIDI3LjA2IDAgNDEgMCBDNDEgMy42MyA0MSA3LjI2IDQxIDExIEMyNy40NyAxMSAxMy45NCAxMSAwIDExIEMwIDcuMzcgMCAzLjc0IDAgMCBaICIgZmlsbD0iI0U5RThFOCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTcsNzIpIi8+Cjwvc3ZnPgo=&style=flat-square&logoColor=black)](https://github.com/feature-sliced/steiger)
[![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white)](https://eslint.org/)

## 🎥 데모

https://github.com/user-attachments/assets/3c52e532-ff3f-4508-baf6-7d4a50afc6ee

## 💡 주요 기능

- WebSocket으로 사용자간 실시간 채팅
- 다대다 채팅 기능
- 채팅 방 생성 및 삭제
- 방 생성 후 채팅 대상 추가 기능
- 입력 타이핑 상태 보이는 기능
- 채팅방 안의 내용 키워드로 검색
- 채팅 대화 디스크에 저장

## 🧩 컴포넌트 구성

![component](https://github.com/user-attachments/assets/9336229c-d6a1-44af-ab6f-22b299c7c192)

## 🚀 실행 방법

### Backend

[Chat-Service 바로가기](https://github.com/Daily1Hour/PickMe-Chat-Service)

```sh
$ npm install
$ npm run start
```

### Frontend

개발 서버 실행

```sh
$ npm install
$ npm run dev
```

Single-SPA 주입 애플리케이션 빌드

```sh
$ npm install
$ npm run build:single-spa
```

## 📂 폴더 구조

> <image src="https://feature-sliced.design/kr/img/brand/logo-primary.png" width=40 />

```python
PickMe-Chat-Application
├─ .github
│  └─ workflows # 깃헙 액션 워크플로어 프로세스
│     ├─ deploy-aws-s3.yml # AWS S3로 페이지로 배포
│     ├─ deploy-gh-pages.yml # 깃헙 페이지로 배포
│     └─ vite-build.yml # Vite로 빌드
├─ index.html
├─ src
│  ├─ app
│  │  ├─ App.vue # 애플리케이션 컴포넌트 진입점
│  │  ├─ application.ts # single-spa 애플리케이션 진입점
│  │  └─ main.ts # 프로바이더 스택
│  ├─ entities # 비즈니스 엔터티 레이어
│  │  └─ chat
│  │     ├─ api
│  │     │  └─ dto.ts
│  │     ├─ model # 엔터티 모델
│  │     │  ├─ index.ts
│  │     │  ├─ Message.ts
│  │     │  ├─ Room.ts
│  │     │  └─ User.ts
│  │     └─ service
│  │        ├─ mapper # 페이로드 ↔ 엔터티 헬퍼 메서드
│  │        │  ├─ dictionary.ts # 매핑헬퍼서비스 사전
│  │        │  ├─ message.ts # 메시지 관련 헬퍼함수
│  │        │  └─ room.ts # 방 관련 헬퍼함수
│  │        └─ socketService.ts
│  ├─ features # 기능 구현체 레이어
│  │  ├─ chat
│  │  │  ├─ index.vue
│  │  │  ├─ service
│  │  │  │  └─ event_helper.ts # 소켓 이벤트 ↔ 로직 이벤트
│  │  │  ├─ store # 중앙상태저장소
│  │  │  │  └─ useChatStore.ts
│  │  │  └─ ui
│  │  │     ├─ index.ts
│  │  │     ├─ layout.vue # 레이어 레이아웃
│  │  │     ├─ connect.vue # 소켓 연결
│  │  │     ├─ title.vue # 채팅 제목
│  │  │     ├─ content.vue # 채팅 컨텐츠
│  │  │     ├─ search.vue # 채팅 메시지 검색
│  │  │     ├─ submit.vue # 채팅 메시지 제출
│  │  │     ├─ actions.vue # 액션 동작 모음
│  │  │     ├─ invite.vue # 추가 사용자 초대
│  │  │     ├─ participants.vue # 참여자 확인
│  │  │     └─ save.vue # 채팅 파일로 저장
│  │  ├─ room
│  │  │  ├─ index.ts
│  │  │  ├─ index.vue
│  │  │  ├─ service
│  │  │  │  └─ event_helper.ts
│  │  │  ├─ store
│  │  │  │  └─ useRoomStore.ts
│  │  │  └─ ui
│  │  │     ├─ index.ts
│  │  │     ├─ layout.vue # 레이아웃
│  │  │     ├─ register.vue # 서버 접속
│  │  │     ├─ make-room.vue # 방 만들기
│  │  │     ├─ leave-room.vue # 방 나가기
│  │  │     └─ room-list.vue # 방 목록
│  │  └─ users
│  │     ├─ index.vue
│  │     ├─ store
│  │     │  └─ useUsersStore.ts
│  │     └─ ui
│  │        └─ user-list.vue # 접속 사용자 목록
│  ├─ widgets # 위젯 레이어
│  │  └─ chat
│  │     ├─ index.vue
│  │     └─ ui
│  │        ├─ index.ts
│  │        └─ layout.vue
│  ├─ pages # 페이지 레이어
│  │  └─ chat
│  │     ├─ index.vue
│  │     └─ ui
│  │        ├─ layout.vue
│  │        └─ fab-layout.vue # 플로팅버튼 레이아웃
│  └─ shared # 공유 레이어
│     ├─ lib
│     │  ├─ tokens.ts # 토큰 3종
│     │  └─ getUser.ts # 접속 유저 정보 불러오기
│     └─ socket_constants.ts # 환경변수 불러오기
├─ .prettierrc # 포맷터
├─ steiger.config.ts # FSD 린트
├─ vite-env.d.ts # 환경변수 타입 정의
├─ shims-vue.d.ts # *.vue 타입 정의
├─ vite.config.ts # Vite 설정 파일
└─ vite.single-spa.config.ts # Single-spa용 Vite 설정 파일
```
