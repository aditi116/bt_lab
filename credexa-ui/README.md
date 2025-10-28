# Credexa UI - React Frontend

Modern, responsive React frontend for the Credexa Fixed Deposit Banking Application with complete JWT authentication and role-based access control.

## 🚀 Technology Stack

- **React 18** - Latest React with hooks
- **Vite** - Lightning fast build tool
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client with interceptors
- **TailwindCSS** - Utility-first CSS framework
- **JWT Authentication** - Token-based authentication
- **ESLint** - Code quality and consistency

## ✨ Features

### 🔐 Authentication & Authorization

- ✅ JWT token-based authentication
- ✅ Automatic token refresh
- ✅ Axios interceptors for token injection
- ✅ Role-based routing (ADMIN, CUSTOMER_MANAGER, CUSTOMER)
- ✅ Protected routes with ModuleProtectedRoute
- ✅ Password masking in forms
- ✅ 5-minute idle timeout with auto-logout
- ✅ Session management

### 📱 User Interface

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Clean and modern UI with TailwindCSS
- ✅ Interactive forms with validation
- ✅ Error handling and user feedback
- ✅ Loading states
- ✅ Success/error notifications

### 🎯 Modules Implemented

1. **Login/Registration**

   - User login with JWT
   - New user registration
   - Password masking
   - Remember me functionality

2. **Customer Management**

   - Create customer profile
   - View customer details
   - Update customer information
   - Customer 360 view
   - Aadhar masking (XXXX-XXXX-1234)

3. **Product Management**

   - View all products
   - Create new products
   - Update product details
   - Delete products
   - Filter by status

4. **FD Calculator**

   - Simple interest calculation
   - Compound interest calculation
   - Multiple compounding frequencies
   - Detailed breakdown

5. **FD Account Management**

   - Create FD accounts
   - View account details
   - Update account status
   - Link to customer profiles

6. **Dashboard**
   - Role-based navigation
   - Quick access to modules
   - User profile information

## 🛠️ Prerequisites

- **Node.js 18+**
- **npm 9+** or **yarn 1.22+**

## 📦 Installation

1. **Navigate to the UI directory:**

```bash
cd credexa-ui
```

2. **Install dependencies:**

```bash
npm install
```

## 🏃 Running the Application

### Development Mode

```bash
npm run dev
```

The application will be available at: **http://localhost:5173**

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
credexa-ui/
├── public/                      # Static assets
├── src/
│   ├── components/              # Reusable components
│   │   ├── ModuleProtectedRoute.jsx
│   │   └── ... (other components)
│   ├── pages/                   # Page components
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── CustomerManagement.jsx
│   │   ├── ProductManagement.jsx
│   │   ├── FDCalculator.jsx
│   │   └── FDAccountManagement.jsx
│   ├── services/                # API services
│   │   ├── authService.js
│   │   ├── customerService.js
│   │   ├── productService.js
│   │   ├── calculatorService.js
│   │   └── fdAccountService.js
│   ├── utils/                   # Utility functions
│   │   ├── auth.js              # Auth helpers
│   │   └── axiosInterceptor.js  # Token interceptor
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
├── .eslintrc.cjs                # ESLint configuration
├── tailwind.config.js           # TailwindCSS configuration
├── vite.config.js               # Vite configuration
├── package.json
└── README.md
```

## 🔧 Configuration

### API Base URL

Update the base URL in `src/services/*.js` files if backend is running on a different host/port:

```javascript
// Default configuration
const API_BASE_URL = "http://localhost:8081/api/auth";
```

### Axios Interceptors

Token is automatically injected into all API requests via `axiosInterceptor.js`:

- Adds `Authorization: Bearer <token>` header
- Auto-refreshes expired tokens
- Handles 401 unauthorized responses

### Protected Routes

Routes are protected based on user roles using `ModuleProtectedRoute`:

```jsx
<Route
  path="/customers"
  element={
    <ModuleProtectedRoute allowedRoles={["ADMIN", "CUSTOMER_MANAGER"]}>
      <CustomerManagement />
    </ModuleProtectedRoute>
  }
/>
```

## 🎨 Styling

This project uses **TailwindCSS** for styling:

- Utility-first CSS framework
- Responsive design with breakpoints
- Custom color palette
- Component-based styling

### Customizing TailwindCSS

Edit `tailwind.config.js` to customize:

- Colors
- Fonts
- Spacing
- Breakpoints

## 🔐 Authentication Flow

1. User enters credentials on login page
2. Frontend sends POST request to `/api/auth/login`
3. Backend validates credentials and returns JWT token
4. Token is stored in localStorage
5. Axios interceptor adds token to all subsequent requests
6. Token is validated on each backend request
7. Auto-logout after 5 minutes of inactivity

## 🌐 API Integration

### Backend Services

| Service    | URL                                   | Port |
| ---------- | ------------------------------------- | ---- |
| Login      | http://localhost:8081/api/auth        | 8081 |
| Customer   | http://localhost:8083/api/customer    | 8083 |
| Product    | http://localhost:8082/api/products    | 8082 |
| Calculator | http://localhost:8084/api/calculator  | 8084 |
| FD Account | http://localhost:8085/api/fd-accounts | 8085 |

### CORS Configuration

Ensure backend services have CORS enabled for `http://localhost:5173`

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage
```

## 📝 Code Quality

### Linting

```bash
# Run ESLint
npm run lint

# Fix ESLint issues
npm run lint:fix
```

### Code Formatting

Follow React best practices:

- Functional components with hooks
- PropTypes for type checking
- Consistent naming conventions
- Clean code principles

## 🐛 Troubleshooting

### Backend Connection Issues

**Problem:** Cannot connect to backend services  
**Solution:**

- Ensure all backend services are running
- Check CORS configuration
- Verify API base URLs in service files

### Token Expiration

**Problem:** Getting 401 Unauthorized errors  
**Solution:**

- Token auto-refreshes via interceptor
- Clear localStorage and re-login if issues persist
- Check token expiration time in backend

### Build Errors

**Problem:** Build fails with dependency errors  
**Solution:**

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use

**Problem:** Port 5173 is already in use  
**Solution:**

- Kill the process using the port
- Or change the port in `vite.config.js`:

```javascript
export default defineConfig({
  server: {
    port: 3000, // Change to desired port
  },
});
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

Builds the app for production to the `dist` folder.

### Deploy to Vercel/Netlify

1. Connect your repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy!

### Environment Variables

Create `.env` file for environment-specific configurations:

```env
VITE_API_BASE_URL=http://localhost:8081
VITE_CUSTOMER_API_URL=http://localhost:8083
VITE_PRODUCT_API_URL=http://localhost:8082
```

Access in code:

```javascript
const apiUrl = import.meta.env.VITE_API_BASE_URL;
```

## 📚 Available Scripts

| Command           | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start development server         |
| `npm run build`   | Build for production             |
| `npm run preview` | Preview production build locally |
| `npm run lint`    | Run ESLint                       |
| `npm run test`    | Run tests                        |

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

This project is part of the Credexa Banking Application.

---

**Frontend Version:** 1.0.0  
**React Version:** 18.3.1  
**Vite Version:** 6.0.11  
**Last Updated:** October 29, 2025

## 🔗 Related

- [Backend Repository](../README.md)
- [API Documentation](http://localhost:8081/api/auth/swagger-ui.html)
