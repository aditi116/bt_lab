@echo off
REM ============================================
REM Credexa - Start Login Service Only
REM ============================================
echo.
echo Starting Login Service on port 8081...
echo.

cd login-service
..\mvnw.cmd spring-boot:run
