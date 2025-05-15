# Getting Started

## **1. pnpm のインストール**

プロジェクトで `pnpm` を使用するため、以下のコマンドで `pnpm` をインストールしてください。

```bash
npm install -g pnpm
```


## **2. 開発環境のセットアップ**

### **2.1 依存関係のインストール**
プロジェクトのルートに移動し、`pnpm` で依存関係をインストールします。

```bash
pnpm i
```

---

### **2.2 PostgreSQL の起動**

Docker Compose を使用して `PostgreSQL` を起動します。

```bash
docker compose up postgres -d
```

※ `-d` オプションはバックグラウンドで起動するためのものです。

---

### **2.3 Prisma のマイグレーションの適用**

Prisma を使用してデータベースにスキーマを適用します。

```bash
pnpm prisma:migrate
```

これにより、データベースが最新のスキーマに更新されます。

---

### **2.4 Prisma Client の生成**

Prisma Client を最新のスキーマに基づいて生成します。

```bash
pnpm prisma:codegen
```

このコマンドを実行することで、Prisma の型付き ORM を使用できるようになります。

---

### **2.5 Seed の実行**

初期データを投入するために `seed` を実行します。

```bash
pnpm prisma:seed
```

---

### **2.6 Prisma Studio の起動**

データベースの内容を確認・編集するために `Prisma Studio` を起動します。

```bash
pnpm prisma:studio
```

このコマンドを実行すると、ブラウザが開き、データベースの内容を GUI で操作できます。

---

### **2.7 開発サーバーの起動**

開発環境で NestJS サーバーを起動します。

```bash
pnpm start:dev
```

これでローカル環境での開発を開始できます！🚀

# 仕様書関連
- [システム仕様書](https://taisuke1214n.atlassian.net/wiki/x/c4CYAQ)
- [アーキテクチャ説明](https://taisuke1214n.atlassian.net/wiki/x/AoCzAQ)