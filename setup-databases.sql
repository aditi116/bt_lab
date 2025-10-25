-- ============================================
-- Credexa Fixed Deposit Banking Application
-- Database Setup Script
-- ============================================
-- This script creates all required databases for the microservices
-- Run this script as MySQL root user or a user with CREATE DATABASE privileges
-- ============================================

-- Drop existing databases if they exist (CAUTION: This will delete all data)
DROP DATABASE IF EXISTS login_db;
DROP DATABASE IF EXISTS customer_db;
DROP DATABASE IF EXISTS product_db;
DROP DATABASE IF EXISTS calculator_db;
DROP DATABASE IF EXISTS fd_account_db;

-- Create databases
CREATE DATABASE login_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE customer_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE product_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE calculator_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE fd_account_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Verify databases were created
SHOW DATABASES LIKE '%_db';

-- Display success message
SELECT 'All databases created successfully!' AS Status;
SELECT '✅ login_db - Ready for login-service (Port 8081)' AS Info
UNION ALL
SELECT '✅ customer_db - Ready for customer-service (Port 8083)' AS Info
UNION ALL
SELECT '✅ product_db - Ready for product-pricing-service (Port 8084)' AS Info
UNION ALL
SELECT '✅ calculator_db - Ready for fd-calculator-service (Port 8087)' AS Info
UNION ALL
SELECT '✅ fd_account_db - Ready for fd-account-service (Port 8086)' AS Info;

-- ============================================
-- Optional: Create dedicated database user
-- ============================================
-- Uncomment the following lines if you want to create a dedicated user
-- for the Credexa application instead of using root

-- DROP USER IF EXISTS 'credexa_user'@'localhost';
-- CREATE USER 'credexa_user'@'localhost' IDENTIFIED BY 'Credexa@2025';

-- Grant privileges
-- GRANT ALL PRIVILEGES ON login_db.* TO 'credexa_user'@'localhost';
-- GRANT ALL PRIVILEGES ON customer_db.* TO 'credexa_user'@'localhost';
-- GRANT ALL PRIVILEGES ON product_db.* TO 'credexa_user'@'localhost';
-- GRANT ALL PRIVILEGES ON calculator_db.* TO 'credexa_user'@'localhost';
-- GRANT ALL PRIVILEGES ON fd_account_db.* TO 'credexa_user'@'localhost';

-- FLUSH PRIVILEGES;

-- SELECT 'Database user "credexa_user" created with password "Credexa@2025"' AS UserInfo;

-- ============================================
-- Note: Tables will be auto-created by Hibernate
-- ============================================
-- Each Spring Boot service is configured with:
--   spring.jpa.hibernate.ddl-auto: update
-- This means Hibernate will automatically create and update tables
-- when the services start for the first time.
-- ============================================
