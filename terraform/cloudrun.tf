resource "google_cloud_run_service" "api" {
  name     = "morume"
  location = var.REGION

  template {
    metadata {
      annotations = {
        "autoscaling.knative.dev/minScale" = "0"
        "autoscaling.knative.dev/maxScale" = "10"
      }
    }
    spec {
      containers {
        image = var.API_IMAGE_URL
        ports {
          container_port = 8080
        }
        env {
          name  = "SWAGGER_USER"
          value = var.SWAGGER_USER
        }
        env {
          name  = "SWAGGER_PASS"
          value = var.SWAGGER_PASS
        }
        env {
          name  = "POSTGRES_USER"
          value = var.POSTGRES_USER
        }
        env {
          name  = "POSTGRES_PASSWORD"
          value = var.POSTGRES_PASSWORD
        }
        env {
          name  = "POSTGRES_DB"
          value = var.POSTGRES_DB
        }
        env {
          name  = "POSTGRES_PORT"
          value = var.POSTGRES_PORT
        }
        env {
          name  = "DATABASE_URL"
          value = var.DATABASE_URL
        }
        env {
          name  = "DIRECT_URL"
          value = var.DIRECT_URL
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  autogenerate_revision_name = true
}

resource "google_cloud_run_service_iam_member" "public_invoker" {
  service  = google_cloud_run_service.api.name
  location = google_cloud_run_service.api.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}
