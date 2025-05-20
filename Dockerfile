FROM node:18-alpine

RUN apk add --no-cache tzdata && \
    cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    echo "Asia/Tokyo" > /etc/timezone

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm exec prisma generate
RUN pnpm exec prisma migrate deploy

RUN pnpm run build

RUN pnpm prune --prod

EXPOSE 8080

CMD ["node", "--enable-source-maps", "dist/src/main.js"]