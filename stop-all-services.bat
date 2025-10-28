@echo off
REM ============================================
REM Credexa - Stop All Services
REM ============================================
REM This script stops all running Java microservices
REM ============================================

echo.
echo ============================================
echo Stopping Credexa Microservices
echo ============================================
echo.

echo Searching for Java processes on ports 8081-8087...
echo.

REM Find and kill processes on each port
for %%p in (8081 8083 8084 8085 8086 8087) do (
    echo Checking port %%p...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":%%p" ^| findstr "LISTENING"') do (
        echo   Found process %%a on port %%p - Terminating...
        taskkill /F /PID %%a >nul 2>&1
    )
)

echo.
echo Killing any remaining Java processes from Spring Boot...
taskkill /F /FI "WINDOWTITLE eq Login Service*" >nul 2>&1
taskkill /F /FI "WINDOWTITLE eq Customer Service*" >nul 2>&1
taskkill /F /FI "WINDOWTITLE eq Product*Service*" >nul 2>&1
taskkill /F /FI "WINDOWTITLE eq Email Service*" >nul 2>&1
taskkill /F /FI "WINDOWTITLE eq FD Account Service*" >nul 2>&1
taskkill /F /FI "WINDOWTITLE eq FD Calculator Service*" >nul 2>&1

echo.
echo ============================================
echo All services stopped!
echo ============================================
echo.
echo You can now restart them using start-all-services.bat
echo.
pause
