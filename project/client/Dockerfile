FROM node:20-bullseye-slim AS builder

WORKDIR /app

COPY package*.json .
COPY tsconfig*.json .
COPY vite.config*.ts .
COPY .env .

COPY src src
COPY index.html .

RUN npm install

ARG VITE_MANUAL_USER_SET
ARG VITE_SOCKET_SERVER_URL
ENV VITE_MANUAL_USER_SET=$VITE_MANUAL_USER_SET
ENV VITE_SOCKET_SERVER_URL=$VITE_SOCKET_SERVER_URL

RUN npm run build

FROM nginx:alpine AS runner

COPY --from=builder app/dist usr/share/nginx/html
COPY nginx.conf etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
