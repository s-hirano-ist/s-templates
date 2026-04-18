FROM node:20.20.2-alpine@sha256:fb4cd12c85ee03686f6af5362a0b0d56d50c58a04632e6c0fb8363f609372293

RUN apk update && apk add --no-cache git curl jq openssh

COPY package.json pnpm-lock.yaml pr-news.ts create_news_pr.sh biome.json .npmrc .env /

RUN chmod +x /create_news_pr.sh

ENV GITHUB_SECRET_KEY=${GITHUB_SECRET_KEY}
ENV GITHUB_USER_NAME=${GITHUB_USER_NAME}
ENV GITHUB_USER_EMAIL=${GITHUB_USER_EMAIL}
ENV POSTGRES_URL=${POSTGRES_URL}

ENTRYPOINT ["sh", "/create_news_pr.sh"]
