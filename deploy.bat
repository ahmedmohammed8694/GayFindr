@echo off
echo 🚀 GayFindr Backend Deployment Script

REM Check if Docker is running
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not installed or not running
    echo Please install Docker Desktop and make sure it's running
    pause
    exit /b 1
)

echo 📦 Installing dependencies...
call npm install

echo 🔨 Building application...
call npm run build

echo 🐳 Building Docker image...
docker build -t gayfindr-backend .

echo ✅ Build complete!
echo.
echo 📋 Next steps:
echo 1. For local testing: docker-compose up
echo 2. For AWS deployment: Run deploy-aws.sh (requires AWS CLI)
echo 3. For other cloud providers: Push gayfindr-backend image to your registry
echo.
pause