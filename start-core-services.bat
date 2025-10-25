@echo off
REM Start only core services (without email-service)

echo.
echo ============================================
echo Starting Credexa Core Services
echo ============================================
echo.

REM Start login-service (Port 8081)
start "Login Service (8081)" cmd /k "cd login-service && ..\mvnw.cmd spring-boot:run"
timeout /t 5 /nobreak >nul

REM Start customer-service (Port 8083)
start "Customer Service (8083)" cmd /k "cd customer-service && ..\mvnw.cmd spring-boot:run"
timeout /t 3 /nobreak >nul

REM Start product-pricing-service (Port 8084)
start "Product Pricing Service (8084)" cmd /k "cd product-pricing-service && ..\mvnw.cmd spring-boot:run"
timeout /t 3 /nobreak >nul

REM Start fd-account-service (Port 8086)
start "FD Account Service (8086)" cmd /k "cd fd-account-service && ..\mvnw.cmd spring-boot:run"
timeout /t 3 /nobreak >nul

REM Start fd-calculator-service (Port 8087)
start "FD Calculator Service (8087)" cmd /k "cd fd-calculator-service && ..\mvnw.cmd spring-boot:run"

echo.
echo ============================================
echo Core services are starting...
echo ============================================
echo.
echo Services:
echo   - Login Service          : http://localhost:8081
echo   - Customer Service       : http://localhost:8083
echo   - Product Pricing Service: http://localhost:8084
echo   - FD Account Service     : http://localhost:8086
echo   - FD Calculator Service  : http://localhost:8087
echo.
echo Wait 30-60 seconds for all services to start.
echo.
pause
