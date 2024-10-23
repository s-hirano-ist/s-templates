FROM node:20.18.0-alpine@sha256:c13b26e7e602ef2f1074aef304ce6e9b7dd284c419b35d89fcf3cc8e44a8def9

RUN apk update && apk add --no-cache git curl jq openssh

COPY package.json pnpm-lock.yaml pr-news.ts create_news_pr.sh biome.json .npmrc .env /

RUN chmod +x /create_news_pr.sh

ENV GITHUB_SECRET_KEY=${GITHUB_SECRET_KEY}
ENV GITHUB_USER_NAME=${GITHUB_USER_NAME}
ENV GITHUB_USER_EMAIL=${GITHUB_USER_EMAIL}
ENV POSTGRES_URL=${POSTGRES_URL}

ENTRYPOINT ["sh", "/create_news_pr.sh"]
