
resource "google_project_service" "artifactregistry" {
  service = "artifactregistry.googleapis.com"
}

resource "google_artifact_registry_repository" "cloud_run" {
  provider      = google
  project       = var.PROJECT_ID
  location      = var.REGION # asia-northeast1
  repository_id = "cloud-run"
  description   = "Cloud Run container images"
  format        = "DOCKER"

  depends_on = [google_project_service.artifactregistry]
}
