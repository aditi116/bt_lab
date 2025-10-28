-- OAuth2/SSO Database Migration Script
-- Run this on your MySQL database before testing SSO

USE credexa_login;

-- Add OAuth2 fields to users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS oauth2_provider VARCHAR(50) COMMENT 'OAuth2 provider name (google, microsoft, github, etc.)',
ADD COLUMN IF NOT EXISTS oauth2_provider_id VARCHAR(255) COMMENT 'Unique ID from OAuth2 provider',
ADD COLUMN IF NOT EXISTS full_name VARCHAR(200) COMMENT 'Full name from OAuth2 profile',
ADD COLUMN IF NOT EXISTS enabled BOOLEAN DEFAULT TRUE COMMENT 'Account enabled status',
ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT FALSE COMMENT 'Email verification status (OAuth2 emails are pre-verified)',
ADD COLUMN IF NOT EXISTS account_non_locked BOOLEAN DEFAULT TRUE COMMENT 'Account lock status',
ADD COLUMN IF NOT EXISTS last_login_time DATETIME COMMENT 'Last login timestamp';

-- Create index for OAuth2 provider lookup
CREATE INDEX IF NOT EXISTS idx_oauth2_provider ON users(oauth2_provider, oauth2_provider_id);

-- Create index for email lookup (for OAuth2 login)
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Verify changes
DESCRIBE users;

-- Show sample OAuth2 user (after first Google login)
-- SELECT * FROM users WHERE oauth2_provider IS NOT NULL;

-- How to manually assign ROLE_ADMIN to an OAuth2 user:
-- 1. Find the OAuth2 user:
--    SELECT id, username, email, oauth2_provider FROM users WHERE oauth2_provider = 'google';
-- 
-- 2. Find the ROLE_ADMIN ID:
--    SELECT id, name FROM roles WHERE name = 'ROLE_ADMIN';
-- 
-- 3. Assign the role:
--    INSERT INTO user_roles (user_id, role_id) VALUES (<user_id_from_step_1>, <role_id_from_step_2>);
-- 
-- 4. Verify:
--    SELECT u.id, u.username, u.email, r.name as role 
--    FROM users u 
--    JOIN user_roles ur ON u.id = ur.user_id 
--    JOIN roles r ON ur.role_id = r.id 
--    WHERE u.oauth2_provider = 'google';

COMMIT;

-- Migration completed successfully!
SELECT 'OAuth2/SSO database migration completed!' AS status;
