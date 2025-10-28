# Credexa - Fixed Deposit Banking Application

A comprehensive microservices-based Fixed Deposit banking application built with Spring Boot, MySQL, and React with complete UI integration.

## 🏗️ Architecture

This is a **multi-module Maven project** with **React frontend** consisting of 8 modules:

### Backend Modules

| Module                      | Port | Description                                          | Status      |
| --------------------------- | ---- | ---------------------------------------------------- | ----------- |
| **common-lib**              | -    | Shared utilities (JWT, DTOs, Events, PII Masking)    | ✅ Complete |
| **login-service**           | 8081 | Authentication & Authorization (JWT, Role-based)     | ✅ Complete |
| **customer-service**        | 8083 | Customer Management (CRUD, 360 View, Classification) | ✅ Complete |
| **product-pricing-service** | 8082 | Product & Pricing Management (CRUD APIs)             | ✅ Complete |
| **fd-calculator-service**   | 8084 | FD Interest Calculator (Simple & Compound)           | ✅ Complete |
| **fd-account-service**      | 8085 | FD Account Management (Account Creation)             | ✅ Complete |
| **email-service**           | 8086 | Email Notifications (Customer, Account, Statements)  | ✅ Complete |

### Frontend

| Module         | Port | Description                           | Status      |
| -------------- | ---- | ------------------------------------- | ----------- |
| **credexa-ui** | 5173 | React 18 + Vite + TailwindCSS + Axios | ✅ Complete |

## 🚀 Technology Stack

### Backend

- **Java 17**
- **Spring Boot 3.5.6**
- **Spring Security** with JWT
- **Spring Data JPA**
- **Spring Events** (Event-driven architecture)
- **MySQL 8.0**
- **Swagger/OpenAPI 3.0**
- **Lombok**
- **BCrypt** for password hashing
- **JavaMailSender** for email notifications

### Frontend

- **React 18**
- **Vite** (Build tool)
- **React Router DOM** (Routing)
- **Axios** (HTTP client with interceptors)
- **TailwindCSS** (Styling)
- **JWT Authentication** (Token management)

## 📋 Features Implemented

### 🔐 Login Service (Port 8081)

- ✅ User Registration (username, email, mobile, role)
- ✅ JWT Authentication & Authorization
- ✅ BCrypt Password Hashing with Salt
- ✅ Auto-logout after 5 minutes idle
- ✅ Role-based Access Control (ADMIN, CUSTOMER_MANAGER, CUSTOMER)
- ✅ Password masking in UI
- ✅ Token refresh mechanism
- ✅ Multi-language & currency support
- ✅ Swagger API documentation
- ✅ PII data masking

### 👥 Customer Service (Port 8083)

- ✅ Create Customer (with duplicate validation)
- ✅ Get Customer by ID
- ✅ Get Customer by User ID
- ✅ Update Customer (partial updates)
- ✅ Get All Customers (Admin only)
- ✅ Get Customer Profile by Username
- ✅ Customer 360 View (customer + FD accounts)
- ✅ Customer Classification (Regular, Senior Citizen, Super Senior)
- ✅ Aadhar PII Masking (XXXX-XXXX-1234)
- ✅ Event consumption for account creation
- ✅ Async email notifications (new customer, profile updates)

### 📦 Product Pricing Service (Port 8082)

- ✅ Create Product (FD products with tenure & rates)
- ✅ Get Product by ID
- ✅ Get All Products
- ✅ Update Product
- ✅ Delete Product
- ✅ Get Products by Active Status
- ✅ Comprehensive validation
- ✅ Swagger documentation

### 🧮 FD Calculator Service (Port 8084)

- ✅ Calculate Simple Interest
- ✅ Calculate Compound Interest
- ✅ Multiple compounding frequencies (Monthly, Quarterly, Half-yearly, Yearly)
- ✅ Detailed calculation breakdown
- ✅ Interest rate validation
- ✅ Tenure validation

### 💰 FD Account Service (Port 8085)

- ✅ Create FD Account
- ✅ Get FD Account by ID
- ✅ Get FD Accounts by Customer ID
- ✅ Update FD Account
- ✅ Account status management (Active, Matured, Closed, Broken)
- ✅ Maturity date calculation
- ✅ Interest calculation integration
- ✅ Event publishing for account creation
- ✅ Async email notifications (new account, statements, notices)

### 📧 Email Service (Port 8086)

- ✅ Welcome email on customer creation
- ✅ Profile update confirmation
- ✅ FD account creation notification
- ✅ Account statements
- ✅ Account notices/updates
- ✅ HTML email templates with styling
- ✅ Gmail SMTP integration
- ✅ Async email processing

### 🎨 React Frontend (Port 5173)

**Features:**

- ✅ Complete UI for all modules
- ✅ JWT Authentication with Axios interceptors
- ✅ Token auto-refresh
- ✅ Role-based routing & access control
- ✅ Protected routes (ModuleProtectedRoute)
- ✅ Password masking in login/registration
- ✅ 5-minute idle timeout
- ✅ Responsive design with TailwindCSS
- ✅ Form validation
- ✅ Error handling & user feedback

**Modules:**

- ✅ Login/Register pages
- ✅ Customer Management UI
- ✅ Product Management UI
- ✅ FD Calculator UI
- ✅ FD Account Management UI
- ✅ Dashboard with role-based navigation

## 🛠️ Prerequisites

- **Java 17** or higher
- **Maven 3.6** or higher
- **MySQL 8.0** or higher
- **Node.js 18+** and npm
- **Gmail Account** (for email service)

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd bt_ki_bt
```

### 2. Setup MySQL

Create databases for each service:

```sql
CREATE DATABASE login_db;
CREATE DATABASE customer_db;
CREATE DATABASE product_pricing_db;
CREATE DATABASE fd_calculator_db;
CREATE DATABASE fd_account_db;
CREATE DATABASE email_db;
```

### 3. Configure Email Service

Update `email-service/src/main/resources/application.yml`:

```yaml
spring:
  mail:
    username: your-gmail@gmail.com
    password: your-app-password # Gmail App Password
```

### 4. Build All Backend Modules

```bash
mvn clean install
```

### 5. Setup Frontend

```bash
cd credexa-ui
npm install
```

## 🏃 Running the Application

### Backend Services

Run each service in separate terminals:

```bash
# Terminal 1 - Login Service
cd login-service
mvn spring-boot:run

# Terminal 2 - Customer Service
cd customer-service
mvn spring-boot:run

# Terminal 3 - Product Pricing Service
cd product-pricing-service
mvn spring-boot:run

# Terminal 4 - FD Calculator Service
cd fd-calculator-service
mvn spring-boot:run

# Terminal 5 - FD Account Service
cd fd-account-service
mvn spring-boot:run

# Terminal 6 - Email Service
cd email-service
mvn spring-boot:run
```

### Frontend

```bash
cd credexa-ui
npm run dev
```

Frontend will be available at: **http://localhost:5173**

## 🌐 Service URLs

| Service           | URL                                   | Swagger UI                                            |
| ----------------- | ------------------------------------- | ----------------------------------------------------- |
| Login             | http://localhost:8081/api/auth        | http://localhost:8081/api/auth/swagger-ui.html        |
| Customer          | http://localhost:8083/api/customer    | http://localhost:8083/api/customer/swagger-ui.html    |
| Product & Pricing | http://localhost:8082/api/products    | http://localhost:8082/api/products/swagger-ui.html    |
| FD Calculator     | http://localhost:8084/api/calculator  | http://localhost:8084/api/calculator/swagger-ui.html  |
| FD Account        | http://localhost:8085/api/fd-accounts | http://localhost:8085/api/fd-accounts/swagger-ui.html |
| Email             | http://localhost:8086/api/email       | http://localhost:8086/api/email/swagger-ui.html       |
| **Frontend**      | **http://localhost:5173**             | **Main UI Application**                               |

## 🔐 Default Credentials

**Test Users:**

1. **Admin User**

   - Username: `admin`
   - Password: `Admin@123`
   - Role: ADMIN

2. **Customer Manager**

   - Username: `manager`
   - Password: `Manager@123`
   - Role: CUSTOMER_MANAGER

3. **Customer**
   - Username: `customer`
   - Password: `Customer@123`
   - Role: CUSTOMER

**⚠️ IMPORTANT:** Change default passwords in production!

## 🏗️ Project Structure

```
bt_ki_bt/
├── pom.xml                      # Parent POM
├── README.md                    # This file
├── common-lib/                  # Shared library
│   └── src/main/java/com/app/common/
│       ├── dto/                 # Common DTOs
│       ├── event/               # Shared events (AccountCreatedEvent)
│       └── util/                # JWT, Encryption, PII Masking
├── login-service/               # Authentication & Authorization
├── customer-service/            # Customer Management
├── product-pricing-service/     # Product & Pricing APIs
├── fd-calculator-service/       # Interest Calculation
├── fd-account-service/          # FD Account Management
├── email-service/               # Email Notifications
└── credexa-ui/                  # React Frontend
    ├── src/
    │   ├── components/          # Reusable components
    │   ├── pages/              # Page components
    │   ├── services/           # API services
    │   ├── utils/              # Utilities (auth, interceptors)
    │   └── App.jsx             # Main app component
    ├── public/
    ├── package.json
    └── vite.config.js
```

## 🔒 Security Features

1. **JWT Authentication** - Stateless authentication with token management
2. **BCrypt Password Hashing** - Strength 12
3. **Auto-Logout** - 5 minutes idle timeout
4. **Role-based Access Control** - @PreAuthorize annotations
5. **PII Data Masking** - Email, mobile, and Aadhar masking
6. **Password Masking** - In UI forms
7. **Token Interceptors** - Auto token injection in API calls
8. **Protected Routes** - ModuleProtectedRoute for role-based UI access
9. **CORS Configuration** - Configured for React frontend

## 📡 Inter-Service Communication

### Event-Driven Architecture

**AccountCreatedEvent Flow:**

1. FD Account Service creates account
2. Publishes `AccountCreatedEvent` via Spring ApplicationEventPublisher
3. Customer Service listens via `@EventListener`
4. Triggers async email notifications (statements, notices, reports)

**Email Notifications:**

- New customer welcome email
- Customer profile update confirmation
- FD account creation notification
- Account statements
- Account notices/updates

## 🧪 Testing

### Backend Testing

```bash
# Run all tests
mvn test

# Run tests for specific service
cd login-service
mvn test
```

### Frontend Testing

```bash
cd credexa-ui
npm run test
```

### Manual Testing with Swagger

Each service has Swagger UI for API testing:

- Login: http://localhost:8081/api/auth/swagger-ui.html
- Customer: http://localhost:8083/api/customer/swagger-ui.html
- Product: http://localhost:8082/api/products/swagger-ui.html
- Calculator: http://localhost:8084/api/calculator/swagger-ui.html
- FD Account: http://localhost:8085/api/fd-accounts/swagger-ui.html

## 🎯 Lab Requirements Completed

- ✅ **Lab L1-L2:** Login Module (Authentication, JWT, Password hashing, Idle timeout)
- ✅ **Lab L3:** Customer Module (CRUD, Aadhar masking, Duplicate validation)
- ✅ **Lab L4:** Authorization Module (Role-based access, @PreAuthorize)
- ✅ **Lab L5:** Product & Pricing Module (Complete CRUD APIs)
- ✅ **Lab L6:** FD Calculator (Simple & Compound interest)
- ✅ **Lab L7:** Login Integration (Token propagation, UI integration)
- ✅ **Lab L8:** Cross-Module Testing (All services integrated)

## 🐛 Troubleshooting

### MySQL Connection Issues

- Ensure MySQL is running
- Check credentials in each service's `application.yml`
- Verify all databases exist

### Port Already in Use

- Kill process: `netstat -ano | findstr :8081` (Windows)
- Kill process: `lsof -ti:8081 | xargs kill` (Mac/Linux)

### Email Not Sending

- Verify Gmail App Password (not regular password)
- Enable 2-factor authentication in Gmail
- Generate App Password from Google Account settings

### Frontend Not Connecting to Backend

- Ensure all backend services are running
- Check CORS configuration in backend services
- Verify API endpoints in frontend services

### Build Failures

```bash
mvn clean install -U
java -version  # Must be Java 17+
```

## 📝 Future Enhancements

- [ ] Add Reports Module
- [ ] Add API Gateway (Spring Cloud Gateway)
- [ ] Add Service Discovery (Eureka)
- [ ] Add Docker support
- [ ] Add Kubernetes deployment
- [ ] Add CI/CD pipeline
- [ ] Add Actuator for monitoring
- [ ] Add Redis for caching
- [ ] Add Kafka for scalable events

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -m 'Add some feature'`
4. Push to branch: `git push origin feature/my-feature`
5. Submit pull request

## 📄 License

This project is licensed under the Apache 2.0 License.

---

**Status:** ✅ **COMPLETE - All Lab Requirements Implemented**  
**Version:** 1.0.0  
**Last Updated:** October 29, 2025
