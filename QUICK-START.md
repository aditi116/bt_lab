# 🚀 Credexa - Quick Start Guide

## ✅ Setup Completed

- ✅ Databases created (login_db, customer_db, product_db, calculator_db, fd_account_db)
- ✅ Database credentials configured (root/root)
- ⏳ Build in progress...

---

## 📦 Build Status

**Current Build Command:**

```powershell
.\mvnw.cmd clean install
```

**What's happening:**

- Downloading Maven dependencies
- Compiling all 7 modules
- Running tests
- Creating JAR files

**Estimated Time:** 3-5 minutes (first build)

---

## 🎯 After Build Completes

### Option 1: Start All Services at Once

```cmd
start-all-services.bat
```

This will open 6 separate windows, one for each service.

### Option 2: Start Services Individually

**Start Login Service First (Recommended):**

```cmd
start-login-service.bat
```

**Or manually:**

```powershell
cd login-service
..\mvnw.cmd spring-boot:run
```

**Then start other services in new terminals:**

```powershell
# Customer Service
cd customer-service
..\mvnw.cmd spring-boot:run

# Product Pricing Service
cd product-pricing-service
..\mvnw.cmd spring-boot:run

# Email Service
cd email-service
..\mvnw.cmd spring-boot:run

# FD Account Service
cd fd-account-service
..\mvnw.cmd spring-boot:run

# FD Calculator Service
cd fd-calculator-service
..\mvnw.cmd spring-boot:run
```

---

## 🌐 Service URLs (After Starting)

| Service             | URL                   | Swagger UI                                            |
| ------------------- | --------------------- | ----------------------------------------------------- |
| **Login**           | http://localhost:8081 | http://localhost:8081/api/auth/swagger-ui.html        |
| **Customer**        | http://localhost:8083 | http://localhost:8083/api/customer/swagger-ui.html    |
| **Product Pricing** | http://localhost:8084 | http://localhost:8084/api/products/swagger-ui.html    |
| **Email**           | http://localhost:8085 | http://localhost:8085/swagger-ui.html                 |
| **FD Account**      | http://localhost:8086 | http://localhost:8086/api/fd-accounts/swagger-ui.html |
| **FD Calculator**   | http://localhost:8087 | http://localhost:8087/api/calculator/swagger-ui.html  |

---

## 🧪 First Test - Login Service

Once login-service starts, test it:

### 1. Check Health

```
GET http://localhost:8081/api/auth/health
```

### 2. Login with Default Admin

```
POST http://localhost:8081/api/auth/login
Content-Type: application/json

{
  "usernameOrEmailOrMobile": "admin",
  "password": "Admin@123"
}
```

### 3. Open Swagger UI

```
http://localhost:8081/api/auth/swagger-ui.html
```

---

## 📊 What Happens on First Start

When each service starts for the first time:

1. ✅ Connects to MySQL database
2. ✅ Hibernate creates all tables automatically
3. ✅ Inserts default data (e.g., admin user in login-service)
4. ✅ Service becomes available on configured port
5. ✅ Swagger UI becomes accessible

---

## 🔍 Verify Database Tables

After services start, check tables were created:

```powershell
# Login Service Tables
& "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -proot -e "USE login_db; SHOW TABLES;"

# Customer Service Tables
& "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -proot -e "USE customer_db; SHOW TABLES;"

# Product Pricing Tables
& "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -proot -e "USE product_db; SHOW TABLES;"
```

---

## 🛑 Stopping Services

- **Batch Script Windows**: Close the command window or press Ctrl+C
- **Manual Start**: Press Ctrl+C in the terminal

---

## 📝 Common Issues

### Build Fails

```powershell
# Clean and rebuild
.\mvnw.cmd clean install -U
```

### Port Already in Use

- Stop existing service on that port
- Or change port in application.yml

### Database Connection Error

- Verify MySQL is running: `Get-Service | Where-Object {$_.Name -like "*mysql*"}`
- Check credentials in application.yml files
- Test connection: `mysql -u root -proot`

---

## 📚 Next Steps After Services Start

1. ✅ Test login-service with default admin credentials
2. ✅ Register a new user via Swagger UI
3. ✅ Create a customer profile
4. ✅ Browse products
5. ✅ Calculate FD returns
6. ✅ Create an FD account

---

**Build Started:** Just now  
**Expected Completion:** 3-5 minutes  
**Status:** ⏳ In Progress...
