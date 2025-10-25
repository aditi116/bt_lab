@echo off
REM ============================================
REM Credexa Database Setup Script for Windows
REM ============================================
echo.
echo ============================================
echo Credexa - Database Setup
echo ============================================
echo.

REM Check if MySQL is installed and accessible
where mysql >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] MySQL client not found in PATH!
    echo.
    echo Please install MySQL or add it to your PATH.
    echo Common MySQL locations:
    echo   - C:\Program Files\MySQL\MySQL Server 8.0\bin
    echo   - C:\xampp\mysql\bin
    echo.
    pause
    exit /b 1
)

echo [INFO] MySQL client found!
echo.

REM Prompt for MySQL credentials
set /p MYSQL_USER="Enter MySQL username (default: root): "
if "%MYSQL_USER%"=="" set MYSQL_USER=root

echo.
echo [INFO] Connecting to MySQL as user: %MYSQL_USER%
echo [INFO] You will be prompted for password...
echo.

REM Execute the database setup script
mysql -u %MYSQL_USER% -p < setup-databases.sql

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ============================================
    echo [SUCCESS] All databases created successfully!
    echo ============================================
    echo.
    echo Created databases:
    echo   - login_db          (login-service)
    echo   - customer_db       (customer-service)
    echo   - product_db        (product-pricing-service)
    echo   - calculator_db     (fd-calculator-service)
    echo   - fd_account_db     (fd-account-service)
    echo.
    echo [NEXT STEPS]
    echo 1. Update application.yml files with your MySQL credentials
    echo 2. Run: mvn clean install
    echo 3. Start each service individually or use start-all-services.bat
    echo.
) else (
    echo.
    echo ============================================
    echo [ERROR] Database setup failed!
    echo ============================================
    echo.
    echo Please check:
    echo   - MySQL server is running
    echo   - Correct username and password
    echo   - User has CREATE DATABASE privileges
    echo.
)

pause
