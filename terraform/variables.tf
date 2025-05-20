variable "project_id" {
  description = "GCPプロジェクトID"
  type        = string
}

variable "api_image_url" {
  description = "Cloud Runで使用するDockerイメージのURL"
  type        = string
}

variable "region" {
  description = "デプロイするGCPリージョン"
  type        = string
  default     = "asia-northeast1"
}


variable "SWAGGER_USER" {
  description = "Swagger UIのユーザー名"
  type        = string
}

variable "SWAGGER_PASS" {
  description = "Swagger UIのパスワード"
  type        = string
  default     = "asia-northeast1"
}

variable "POSTGRES_USER" {
  description = "PostgreSQLのユーザー名"
  type        = string
}

variable "POSTGRES_PASSWORD" {
  description = "PostgreSQLのパスワード"
  type        = string
  default     = "asia-northeast1"
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

