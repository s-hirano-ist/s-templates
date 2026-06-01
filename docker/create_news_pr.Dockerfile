FROM node:24.16.0-alpine@sha256:2bdb65ed1dab192432bc31c95f94155ca5ad7fc1392fb7eb7526ab682fa5bf14

RUN apk update && apk add --no-cache git curl jq openssh

COPY package.json pnpm-lock.yaml pr-news.ts create_news_pr.sh biome.json .npmrc .env /

RUN chmod +x /create_news_pr.sh

ENV GITHUB_SECRET_KEY=${GITHUB_SECRET_KEY}
ENV GITHUB_USER_NAME=${GITHUB_USER_NAME}
ENV GITHUB_USER_EMAIL=${GITHUB_USER_EMAIL}
ENV POSTGRES_URL=${POSTGRES_URL}

ENTRYPOINT ["sh", "/create_news_pr.sh"]
