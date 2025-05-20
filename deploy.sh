#!/bin/bash

# Build and push the Docker image
docker buildx build --platform linux/amd64 \
    -t gcr.io/morume/api:latest \
    --build-arg DATABASE_URL="${DATABASE_URL}" \
    --build-arg DIRECT_URL="${DIRECT_URL}" \
    --push .

# Get the image digest after push
IMAGE_DIGEST=$(gcloud container images describe gcr.io/morume/api:latest \
    --format='get(image_summary.digest)')

# Compose full image reference with digest
IMAGE_REFERENCE="gcr.io/morume/api@$IMAGE_DIGEST"

cd ./terraform
terraform init
terraform apply -var-file=prod.tfvars -var="API_IMAGE_URL=$IMAGE_REFERENCE"
