# ============================================
# Credexa Database Setup Script (PowerShell)
# ============================================

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "Credexa - Database Setup" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Check if MySQL is installed
$mysqlPath = Get-Command mysql -ErrorAction SilentlyContinue

if (-not $mysqlPath) {
    Write-Host "[ERROR] MySQL client not found in PATH!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install MySQL or add it to your PATH." -ForegroundColor Yellow
    Write-Host "Common MySQL locations:" -ForegroundColor Yellow
    Write-Host "  - C:\Program Files\MySQL\MySQL Server 8.0\bin" -ForegroundColor Yellow
    Write-Host "  - C:\xampp\mysql\bin" -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "[INFO] MySQL client found!" -ForegroundColor Green
Write-Host ""

# Prompt for MySQL credentials
$mysqlUser = Read-Host "Enter MySQL username (default: root)"
if ([string]::IsNullOrWhiteSpace($mysqlUser)) {
    $mysqlUser = "root"
}

Write-Host ""
Write-Host "[INFO] Connecting to MySQL as user: $mysqlUser" -ForegroundColor Cyan
Write-Host "[INFO] You will be prompted for password..." -ForegroundColor Cyan
Write-Host ""

# Execute the database setup script
$scriptPath = Join-Path $PSScriptRoot "setup-databases.sql"

if (-not (Test-Path $scriptPath)) {
    Write-Host "[ERROR] setup-databases.sql not found!" -ForegroundColor Red
    Write-Host "Expected location: $scriptPath" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Run MySQL command
$mysqlCommand = "mysql -u $mysqlUser -p"
Get-Content $scriptPath | & mysql -u $mysqlUser -p

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "============================================" -ForegroundColor Green
    Write-Host "[SUCCESS] All databases created successfully!" -ForegroundColor Green
    Write-Host "============================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Created databases:" -ForegroundColor Cyan
    Write-Host "  - login_db          (login-service)" -ForegroundColor White
    Write-Host "  - customer_db       (customer-service)" -ForegroundColor White
    Write-Host "  - product_db        (product-pricing-service)" -ForegroundColor White
    Write-Host "  - calculator_db     (fd-calculator-service)" -ForegroundColor White
    Write-Host "  - fd_account_db     (fd-account-service)" -ForegroundColor White
    Write-Host ""
    Write-Host "[NEXT STEPS]" -ForegroundColor Yellow
    Write-Host "1. Update application.yml files with your MySQL credentials" -ForegroundColor White
    Write-Host "2. Run: mvn clean install" -ForegroundColor White
    Write-Host "3. Start each service individually or use start-all-services.bat" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "============================================" -ForegroundColor Red
    Write-Host "[ERROR] Database setup failed!" -ForegroundColor Red
    Write-Host "============================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please check:" -ForegroundColor Yellow
    Write-Host "  - MySQL server is running" -ForegroundColor White
    Write-Host "  - Correct username and password" -ForegroundColor White
    Write-Host "  - User has CREATE DATABASE privileges" -ForegroundColor White
    Write-Host ""
}

Read-Host "Press Enter to exit"
