# 🌐 Credexa - All Service Endpoints

## ✅ All Services Are Running!

---

## 🔐 1. LOGIN SERVICE (Port 8081)

**Base URL:** `http://localhost:8081/api/auth`

### 📖 Swagger UI

🔗 **http://localhost:8081/api/auth/swagger-ui.html**

### 🔓 Public Endpoints (No Authentication)

#### Register New User

```
POST http://localhost:8081/api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "password": "SecurePass@123",
  "email": "john.doe@example.com",
  "mobileNumber": "+1234567890",
  "preferredLanguage": "en",
  "preferredCurrency": "USD"
}
```

#### Login

```
POST http://localhost:8081/api/auth/login
Content-Type: application/json

{
  "usernameOrEmailOrMobile": "admin",
  "password": "Admin@123"
}
```

**Default Admin Credentials:**

- Username: `admin`
- Password: `Admin@123`

#### Validate Token

```
POST http://localhost:8081/api/auth/validate-token
Content-Type: application/json

{
  "token": "your-jwt-token-here"
}
```

#### Health Check

```
GET http://localhost:8081/api/auth/health
```

#### Bank Configuration

```
GET http://localhost:8081/api/auth/bank-config
```

### 🔒 Protected Endpoints (Requires JWT Token)

#### Logout

```
POST http://localhost:8081/api/auth/logout
Authorization: Bearer your-jwt-token
```

#### Refresh Token

```
POST http://localhost:8081/api/auth/refresh
Authorization: Bearer your-jwt-token
```

#### Get User Profile

```
GET http://localhost:8081/api/auth/profile
Authorization: Bearer your-jwt-token
```

#### Update Profile

```
PUT http://localhost:8081/api/auth/profile
Authorization: Bearer your-jwt-token
Content-Type: application/json

{
  "email": "newemail@example.com",
  "mobileNumber": "+9876543210",
  "preferredLanguage": "hi",
  "preferredCurrency": "INR"
}
```

#### Change Password

```
POST http://localhost:8081/api/auth/change-password
Authorization: Bearer your-jwt-token
Content-Type: application/json

{
  "oldPassword": "OldPass@123",
  "newPassword": "NewPass@123"
}
```

---

## 👥 2. CUSTOMER SERVICE (Port 8083)

**Base URL:** `http://localhost:8083/api/customer`

### 📖 Swagger UI

🔗 **http://localhost:8083/api/customer/swagger-ui.html**

### Key Endpoints

#### Create Customer

```
POST http://localhost:8083/api/customer
Authorization: Bearer your-jwt-token
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "dateOfBirth": "1990-01-15",
  "gender": "MALE",
  "nationality": "Indian",
  "email": "john.doe@example.com",
  "mobileNumber": "+919876543210",
  "address": {
    "addressLine1": "123 Main Street",
    "city": "Mumbai",
    "state": "Maharashtra",
    "country": "India",
    "pinCode": "400001"
  },
  "kycDocuments": [
    {
      "documentType": "AADHAAR",
      "documentNumber": "123456789012",
      "issuedDate": "2020-01-01",
      "expiryDate": null
    }
  ],
  "employmentInfo": {
    "employmentType": "SALARIED",
    "employer": "ABC Corp",
    "designation": "Software Engineer",
    "annualIncome": 1200000
  }
}
```

#### Get Customer by ID

```
GET http://localhost:8083/api/customer/{customerId}
Authorization: Bearer your-jwt-token
```

#### Update Customer

```
PUT http://localhost:8083/api/customer/{customerId}
Authorization: Bearer your-jwt-token
```

#### Get All Customers

```
GET http://localhost:8083/api/customer?page=0&size=10
Authorization: Bearer your-jwt-token
```

#### Search Customers

```
GET http://localhost:8083/api/customer/search?keyword=john
Authorization: Bearer your-jwt-token
```

---

## 🏦 3. PRODUCT PRICING SERVICE (Port 8084)

**Base URL:** `http://localhost:8084/api/products`

### 📖 Swagger UI

🔗 **http://localhost:8084/api/products/swagger-ui.html**

### Key Endpoints

#### Get All Products

```
GET http://localhost:8084/api/products
Authorization: Bearer your-jwt-token
```

#### Get Product by ID

```
GET http://localhost:8084/api/products/{productId}
Authorization: Bearer your-jwt-token
```

#### Get Product by Code

```
GET http://localhost:8084/api/products/code/{productCode}
Authorization: Bearer your-jwt-token
```

#### Get Active Products

```
GET http://localhost:8084/api/products/active
Authorization: Bearer your-jwt-token
```

#### Get Products by Type

```
GET http://localhost:8084/api/products/type/FIXED_DEPOSIT
Authorization: Bearer your-jwt-token
```

#### Create Product

```
POST http://localhost:8084/api/products
Authorization: Bearer your-jwt-token
Content-Type: application/json

{
  "productName": "Super Saver FD",
  "productCode": "FD001",
  "productType": "FIXED_DEPOSIT",
  "description": "High-interest fixed deposit",
  "minAmount": 10000,
  "maxAmount": 10000000,
  "minTermMonths": 6,
  "maxTermMonths": 60,
  "interestCalculationType": "COMPOUND",
  "compoundingFrequency": "QUARTERLY",
  "effectiveDate": "2025-01-01",
  "status": "ACTIVE"
}
```

#### Get Interest Rates for Product

```
GET http://localhost:8084/api/products/{productId}/interest-rates
Authorization: Bearer your-jwt-token
```

#### Get Applicable Interest Rate

```
GET http://localhost:8084/api/products/{productId}/interest-rates/applicable?amount=100000&termMonths=12
Authorization: Bearer your-jwt-token
```

---

## 📧 4. EMAIL SERVICE (Port 8085)

**Base URL:** `http://localhost:8085/api/email`

### 📖 Swagger UI

🔗 **http://localhost:8085/swagger-ui.html**

### Key Endpoints

#### Send Simple Email

```
POST http://localhost:8085/api/email/send
Content-Type: application/json

{
  "to": "recipient@example.com",
  "subject": "Welcome to Credexa",
  "body": "Thank you for joining Credexa Bank!"
}
```

#### Send Template Email

```
POST http://localhost:8085/api/email/send
Content-Type: application/json

{
  "to": "customer@example.com",
  "subject": "Welcome to Credexa",
  "templateName": "welcome",
  "templateData": {
    "name": "John Doe",
    "loginUrl": "http://localhost:3000/login"
  }
}
```

#### Health Check

```
GET http://localhost:8085/api/email/health
```

---

## 💰 5. FD ACCOUNT SERVICE (Port 8086)

**Base URL:** `http://localhost:8086/api/fd-accounts`

### 📖 Swagger UI

🔗 **http://localhost:8086/api/fd-accounts/swagger-ui.html**

### Key Endpoints

#### Create FD Account

```
POST http://localhost:8086/api/fd-accounts
Authorization: Bearer your-jwt-token
Content-Type: application/json

{
  "customerId": 1,
  "productId": 1,
  "principalAmount": 100000,
  "tenure": 12,
  "tenureUnit": "MONTHS",
  "interestRate": 7.5,
  "maturityInstruction": "CREDIT_TO_ACCOUNT",
  "nomineeDetails": {
    "name": "Jane Doe",
    "relationship": "SPOUSE",
    "dateOfBirth": "1992-05-20"
  }
}
```

#### Get FD Account by ID

```
GET http://localhost:8086/api/fd-accounts/{accountId}
Authorization: Bearer your-jwt-token
```

#### Get FD Account by Account Number

```
GET http://localhost:8086/api/fd-accounts/account/{accountNumber}
Authorization: Bearer your-jwt-token
```

#### Get Customer's FD Accounts

```
GET http://localhost:8086/api/fd-accounts/customer/{customerId}
Authorization: Bearer your-jwt-token
```

#### Get Account Balance

```
GET http://localhost:8086/api/fd-accounts/{accountId}/balance
Authorization: Bearer your-jwt-token
```

#### Get Account Transactions

```
GET http://localhost:8086/api/fd-accounts/{accountId}/transactions
Authorization: Bearer your-jwt-token
```

#### Premature Closure

```
POST http://localhost:8086/api/fd-accounts/{accountId}/close
Authorization: Bearer your-jwt-token
Content-Type: application/json

{
  "closureReason": "EMERGENCY",
  "remarks": "Need funds urgently"
}
```

---

## 🧮 6. FD CALCULATOR SERVICE (Port 8087)

**Base URL:** `http://localhost:8087/api/calculator`

### 📖 Swagger UI

🔗 **http://localhost:8087/api/calculator/swagger-ui.html**

### Key Endpoints

#### Standalone Calculation (Manual Input)

```
POST http://localhost:8087/api/calculator/calculate/standalone
Content-Type: application/json

{
  "principalAmount": 100000,
  "interestRate": 7.5,
  "tenure": 12,
  "tenureUnit": "MONTHS",
  "calculationType": "COMPOUND",
  "compoundingFrequency": "QUARTERLY",
  "applyTds": true,
  "tdsRate": 10
}
```

#### Product-Based Calculation

```
POST http://localhost:8087/api/calculator/calculate/product-based
Authorization: Bearer your-jwt-token
Content-Type: application/json

{
  "productId": 1,
  "principalAmount": 100000,
  "tenure": 12,
  "tenureUnit": "MONTHS",
  "customerId": 1,
  "applyTds": true
}
```

#### Compare Multiple FD Options

```
POST http://localhost:8087/api/calculator/compare
Authorization: Bearer your-jwt-token
Content-Type: application/json

{
  "scenarios": [
    {
      "productId": 1,
      "principalAmount": 100000,
      "tenure": 12,
      "tenureUnit": "MONTHS"
    },
    {
      "productId": 2,
      "principalAmount": 100000,
      "tenure": 24,
      "tenureUnit": "MONTHS"
    }
  ],
  "customerId": 1
}
```

#### Get Monthly Breakdown

```
GET http://localhost:8087/api/calculator/breakdown?principalAmount=100000&interestRate=7.5&tenure=12&tenureUnit=MONTHS&calculationType=COMPOUND&compoundingFrequency=QUARTERLY
```

---

## 🔄 Complete Flow Example

### 1. Register & Login

```bash
# Register new user
POST http://localhost:8081/api/auth/register
{
  "username": "testuser",
  "password": "Test@123",
  "email": "test@example.com"
}

# Login
POST http://localhost:8081/api/auth/login
{
  "usernameOrEmailOrMobile": "testuser",
  "password": "Test@123"
}
# Save the JWT token from response
```

### 2. Create Customer Profile

```bash
POST http://localhost:8083/api/customer
Authorization: Bearer {your-jwt-token}
{
  "firstName": "Test",
  "lastName": "User",
  "dateOfBirth": "1995-01-01",
  "email": "test@example.com"
}
# Save the customerId from response
```

### 3. Browse Products

```bash
GET http://localhost:8084/api/products/active
Authorization: Bearer {your-jwt-token}
# Choose a product, note the productId
```

### 4. Calculate Returns

```bash
POST http://localhost:8087/api/calculator/calculate/product-based
Authorization: Bearer {your-jwt-token}
{
  "productId": 1,
  "principalAmount": 100000,
  "tenure": 12,
  "tenureUnit": "MONTHS",
  "customerId": 1
}
```

### 5. Create FD Account

```bash
POST http://localhost:8086/api/fd-accounts
Authorization: Bearer {your-jwt-token}
{
  "customerId": 1,
  "productId": 1,
  "principalAmount": 100000,
  "tenure": 12,
  "tenureUnit": "MONTHS",
  "interestRate": 7.5
}
```

---

## 📊 Quick Test Commands

### Using cURL (Windows PowerShell)

```powershell
# Test Login Service
Invoke-WebRequest -Uri "http://localhost:8081/api/auth/health" -Method GET

# Login and get token
$loginResponse = Invoke-RestMethod -Uri "http://localhost:8081/api/auth/login" -Method POST -ContentType "application/json" -Body '{"usernameOrEmailOrMobile":"admin","password":"Admin@123"}'
$token = $loginResponse.data.token
Write-Host "Token: $token"

# Get all products
Invoke-RestMethod -Uri "http://localhost:8084/api/products" -Method GET -Headers @{Authorization="Bearer $token"}
```

---

## 🛠️ Testing Tools

### Recommended Tools:

1. **Swagger UI** - Built into each service
2. **Postman** - Import endpoints for easy testing
3. **cURL** or **PowerShell** - Command line testing
4. **Browser** - For GET endpoints

---

## 📝 Notes

- All services are running with **JWT authentication DISABLED** in development mode
- Default admin user: `admin` / `Admin@123`
- Database tables are auto-created by Hibernate
- Swagger UI is available for all services for interactive testing

---

**Status:** ✅ All 6 services running successfully!  
**Date:** October 24, 2025
