variable "GOOGLE_PROJECT_ID" {
  description = "FirebaseプロジェクトID"
  type        = string
}

variable "GOOGLE_PRIVATE_KEY" {
  description = "Firebaseの秘密鍵"
  type        = string
}

variable "GOOGLE_CLIENT_EMAIL" {
  description = "Firebaseのクライアントメール"
  type        = string
}

variable "PROJECT_ID" {
  description = "GCPプロジェクトID"
  type        = string
}

variable "API_IMAGE_URL" {
  description = "Cloud Runで使用するDockerイメージのURL"
  type        = string
}

variable "REGION" {
  description = "デプロイするGCPリージョン"
  type        = string
}


variable "SWAGGER_USER" {
  description = "Swagger UIのユーザー名"
  type        = string
}

variable "SWAGGER_PASS" {
  description = "Swagger UIのパスワード"
  type        = string
}

variable "POSTGRES_USER" {
  description = "PostgreSQLのユーザー名"
  type        = string
}

variable "POSTGRES_PASSWORD" {
  description = "PostgreSQLのパスワード"
  type        = string
}

variable "POSTGRES_DB" {
  description = "PostgreSQLのデータベース名"
  type        = string
}

variable "POSTGRES_PORT" {
  description = "PostgreSQLのポート番号"
  type        = string
}

variable "DATABASE_URL" {
  description = "PostgreSQLの接続URL"
  type        = string
}

variable "DIRECT_URL" {
  description = "PostgreSQLの接続URL"
  type        = string
}

