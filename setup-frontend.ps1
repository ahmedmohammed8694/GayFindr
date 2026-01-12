Write-Host "Setting up Connectr frontend..." -ForegroundColor Yellow

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Green
npm install

# Update API URL reminder
Write-Host "Remember to update API_BASE_URL in ApiService.ts" -ForegroundColor Yellow

# Start the app
Write-Host "Starting Connectr..." -ForegroundColor Green
npm start