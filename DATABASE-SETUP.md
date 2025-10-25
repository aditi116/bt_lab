# 💾 Credexa - Database Setup Guide

This guide will help you set up all required MySQL databases for the Credexa Fixed Deposit Banking Application.

## 📋 Prerequisites

Before setting up the databases, ensure you have:

- ✅ **MySQL 8.0 or higher** installed and running
- ✅ **MySQL client** accessible from command line
- ✅ **Root access** or a user with `CREATE DATABASE` privileges
- ✅ **Port 3306** available (default MySQL port)

---

## 🗄️ Databases Required

The application uses **5 separate databases** (one per microservice):

| Database        | Service                 | Port | Purpose                             |
| --------------- | ----------------------- | ---- | ----------------------------------- |
| `login_db`      | login-service           | 8081 | User authentication & authorization |
| `customer_db`   | customer-service        | 8083 | Customer profiles & classifications |
| `product_db`    | product-pricing-service | 8084 | Product catalog & interest rates    |
| `calculator_db` | fd-calculator-service   | 8087 | FD calculations (minimal usage)     |
| `fd_account_db` | fd-account-service      | 8086 | FD accounts & transactions          |

**Note**: `email-service` does not require a database.

---

## 🚀 Quick Setup (Automated)

### Option 1: Using Batch Script (Recommended for Windows)

```cmd
setup-databases.bat
```

1. Double-click `setup-databases.bat` or run it from command prompt
2. Enter your MySQL username (default: root)
3. Enter your MySQL password when prompted
4. Databases will be created automatically

### Option 2: Using PowerShell

```powershell
.\setup-databases.ps1
```

1. Open PowerShell in the project directory
2. Run the script
3. Enter MySQL credentials when prompted

### Option 3: Using MySQL Client Directly

```cmd
mysql -u root -p < setup-databases.sql
```

Enter your MySQL password when prompted.

---

## 🔧 Manual Setup

If you prefer to create databases manually:

### 1. Connect to MySQL

```cmd
mysql -u root -p
```

### 2. Create Databases

```sql
CREATE DATABASE login_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE customer_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE product_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE calculator_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE fd_account_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. Verify Databases

```sql
SHOW DATABASES LIKE '%_db';
```

You should see all 5 databases listed.

---

## 👤 Creating a Dedicated Database User (Optional)

For better security, create a dedicated user instead of using root:

### 1. Create User

```sql
CREATE USER 'credexa_user'@'localhost' IDENTIFIED BY 'Credexa@2025';
```

### 2. Grant Privileges

```sql
GRANT ALL PRIVILEGES ON login_db.* TO 'credexa_user'@'localhost';
GRANT ALL PRIVILEGES ON customer_db.* TO 'credexa_user'@'localhost';
GRANT ALL PRIVILEGES ON product_db.* TO 'credexa_user'@'localhost';
GRANT ALL PRIVILEGES ON calculator_db.* TO 'credexa_user'@'localhost';
GRANT ALL PRIVILEGES ON fd_account_db.* TO 'credexa_user'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Update application.yml Files

Update the following files to use the new user:

```yaml
spring:
  datasource:
    username: credexa_user
    password: Credexa@2025
```

**Files to update:**

- `login-service/src/main/resources/application.yml`
- `customer-service/src/main/resources/application.yml`
- `product-pricing-service/src/main/resources/application.yml`
- `fd-calculator-service/src/main/resources/application.yml`
- `fd-account-service/src/main/resources/application.yml`

---

## 📊 Table Creation

**Good News!** You don't need to create tables manually.

All tables are **automatically created** by Hibernate when you start each service for the first time.

Each service is configured with:

```yaml
spring:
  jpa:
    hibernate:
      ddl-auto: update
```

This means:

- Tables are created automatically if they don't exist
- Schema is updated automatically when entities change
- Existing data is preserved

---

## ✅ Verification

### Check if Databases Exist

```sql
SHOW DATABASES LIKE '%_db';
```

Expected output:

```
+--------------------+
| Database (%_db)    |
+--------------------+
| calculator_db      |
| customer_db        |
| fd_account_db      |
| login_db           |
| product_db         |
+--------------------+
```

### Check Database Sizes

```sql
SELECT
    table_schema AS 'Database',
    ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS 'Size (MB)'
FROM information_schema.tables
WHERE table_schema IN ('login_db', 'customer_db', 'product_db', 'calculator_db', 'fd_account_db')
GROUP BY table_schema;
```

---

## 🔄 Current Database Configuration

The services are currently configured with:

```yaml
spring:
  datasource:
    username: root
    password: yuvi
```

**⚠️ Important:**

- Change the password `yuvi` to your MySQL root password
- Or create a dedicated user as described above

---

## 🐛 Troubleshooting

### MySQL Not Found

**Error:** `mysql is not recognized as an internal or external command`

**Solution:**

1. Add MySQL to PATH:
   - Default location: `C:\Program Files\MySQL\MySQL Server 8.0\bin`
   - XAMPP: `C:\xampp\mysql\bin`
2. Or use full path:
   ```cmd
   "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p
   ```

### MySQL Server Not Running

**Error:** `Can't connect to MySQL server on 'localhost'`

**Solution:**

1. Start MySQL service:
   ```cmd
   net start MySQL80
   ```
2. Or start via Services (`services.msc`)

### Access Denied

**Error:** `Access denied for user 'root'@'localhost'`

**Solution:**

- Check username and password
- Ensure user has CREATE DATABASE privileges
- Reset root password if forgotten

### Database Already Exists

**Warning:** `Can't create database 'login_db'; database exists`

**Solution:**

- This is normal if databases were created previously
- To recreate: Run `setup-databases.sql` (includes DROP DATABASE)
- **⚠️ Warning:** This will delete all existing data!

### Port 3306 Already in Use

**Error:** MySQL won't start because port is in use

**Solution:**

1. Check what's using port 3306:
   ```cmd
   netstat -ano | findstr :3306
   ```
2. Stop conflicting service or change MySQL port

---

## 📝 Next Steps

After setting up databases:

1. ✅ **Verify database credentials** in all `application.yml` files
2. ✅ **Build the project:**
   ```cmd
   mvn clean install
   ```
3. ✅ **Start services** (one at a time or all together):
   ```cmd
   cd login-service
   mvn spring-boot:run
   ```
4. ✅ **Check logs** to verify database connections
5. ✅ **Verify tables** were auto-created by Hibernate

---

## 📚 Additional Resources

- [MySQL 8.0 Documentation](https://dev.mysql.com/doc/refman/8.0/en/)
- [Spring Boot JPA Configuration](https://docs.spring.io/spring-boot/docs/current/reference/html/data.html#data.sql.jpa-and-spring-data)
- [Hibernate DDL Auto](https://docs.jboss.org/hibernate/orm/5.4/userguide/html_single/Hibernate_User_Guide.html#configurations-hbmddl)

---

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review service logs for detailed error messages
3. Ensure MySQL server is running and accessible

---

**Status:** ✅ Ready to set up databases  
**Last Updated:** October 24, 2025
