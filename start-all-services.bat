@echo off
REM ============================================
REM Credexa - Start All Services
REM ============================================
REM This script starts all microservices in separate windows
REM Make sure you have run "mvnw.cmd clean install" first
REM ============================================

echo.
echo ============================================
echo Starting Credexa Microservices
echo ============================================
echo.

REM Check if build was done
if not exist "login-service\target\login-service-0.0.1-SNAPSHOT.jar" (
    echo [ERROR] Services not built yet!
    echo.
    echo Please run this command first:
    echo   mvnw.cmd clean install
    echo.
    pause
    exit /b 1
)

echo Starting services in separate windows...
echo.

REM Start login-service (Port 8081)
start "Login Service (8081)" cmd /k "cd login-service && ..\mvnw.cmd spring-boot:run"
timeout /t 3 /nobreak >nul

REM Start customer-service (Port 8083)
start "Customer Service (8083)" cmd /k "cd customer-service && ..\mvnw.cmd spring-boot:run"
timeout /t 3 /nobreak >nul

REM Start product-pricing-service (Port 8084)
start "Product Pricing Service (8084)" cmd /k "cd product-pricing-service && ..\mvnw.cmd spring-boot:run"
timeout /t 3 /nobreak >nul

REM Start email-service (Port 8085) - DISABLED FOR NOW
REM start "Email Service (8085)" cmd /k "cd email-service && ..\mvnw.cmd spring-boot:run"
REM timeout /t 3 /nobreak >nul
echo Skipping Email Service (will configure later)...

REM Start fd-account-service (Port 8086)
start "FD Account Service (8086)" cmd /k "cd fd-account-service && ..\mvnw.cmd spring-boot:run"
timeout /t 3 /nobreak >nul

REM Start fd-calculator-service (Port 8087)
start "FD Calculator Service (8087)" cmd /k "cd fd-calculator-service && ..\mvnw.cmd spring-boot:run"

echo.
echo ============================================
echo All services are starting...
echo ============================================
echo.
echo Services will open in separate windows:
echo   - Login Service          : http://localhost:8081/api/auth/swagger-ui.html
echo   - Customer Service       : http://localhost:8083/api/customer/swagger-ui.html
echo   - Product Pricing Service: http://localhost:8084/api/products/swagger-ui.html
REM echo   - Email Service          : http://localhost:8085/swagger-ui.html (DISABLED)
echo   - FD Account Service     : http://localhost:8086/api/fd-accounts/swagger-ui.html
echo   - FD Calculator Service  : http://localhost:8087/api/calculator/swagger-ui.html
echo.
echo Wait 30-60 seconds for all services to start completely.
echo.
echo Close each service window to stop that service.
echo.
pause
