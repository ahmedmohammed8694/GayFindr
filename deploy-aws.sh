#!/bin/bash

# AWS App Runner deployment script
# Prerequisites: AWS CLI configured with appropriate permissions

set -e

APP_NAME="gayfindr-backend"
REGION="us-east-1"
ECR_REPO="${APP_NAME}-repo"

echo "🚀 Starting deployment to AWS..."

# Build and push Docker image to ECR
echo "📦 Building Docker image..."
docker build -t $APP_NAME .

# Create ECR repository if it doesn't exist
aws ecr describe-repositories --repository-names $ECR_REPO --region $REGION 2>/dev/null || \
aws ecr create-repository --repository-name $ECR_REPO --region $REGION

# Get ECR login token
aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $(aws sts get-caller-identity --query Account --output text).dkr.ecr.$REGION.amazonaws.com

# Tag and push image
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
ECR_URI="$ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/$ECR_REPO:latest"

docker tag $APP_NAME:latest $ECR_URI
docker push $ECR_URI

echo "✅ Image pushed to ECR: $ECR_URI"
echo "🔧 Create App Runner service manually in AWS Console or use the apprunner.yaml configuration"