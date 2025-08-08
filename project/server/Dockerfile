# 1) Node.js 베이스 이미지 선택
FROM node:18-alpine AS builder

# 2) 작업 디렉토리 설정
WORKDIR /app

# 3) package.json, package-lock.json 복사
COPY package*.json ./

# 4) 의존성 설치 ( --prod or --legacy-peer-deps 등 상황에 맞게 조정 )
RUN npm install

# 5) 소스 복사
COPY . .

# 6) Nest build
RUN npm run build

# ---- Production Stage (최종 이미지) ----
FROM node:18-alpine AS runner

WORKDIR /app

# 7) builder 스테이지에서 dist/ 폴더만 가져오기
COPY --from=builder /app/dist ./dist

# package.json, package-lock.json도 가져와서 prod 의존성만 설치
COPY --from=builder /app/package*.json ./

RUN npm install --omit=dev

# 8) 포트 노출 (Nest 기본 3000)
EXPOSE 3000

# 9) Nest.js 앱 실행 명령
CMD ["node", "dist/main"]
