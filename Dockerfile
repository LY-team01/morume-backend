# ベースイメージ
FROM node:18-alpine

# タイムゾーン設定（任意）
RUN apk add --no-cache tzdata && \
    cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    echo "Asia/Tokyo" > /etc/timezone

# pnpm インストール
RUN npm install -g pnpm

WORKDIR /app

# パッケージインストール
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# アプリコードをコピー
COPY . .

# ビルド
RUN pnpm run build

# Prisma Client生成 & マイグレーション適用（DATABASE_URL が必要）
RUN pnpm exec prisma generate
RUN pnpm exec prisma migrate deploy

# 本番依存だけ残す
RUN pnpm prune --prod

EXPOSE 8080

# ⚠️ ここが希望通りのアプリ起動方法
CMD ["node", "--enable-source-maps", "dist/src/main.js"]