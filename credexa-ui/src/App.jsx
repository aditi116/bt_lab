import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useIdleTimer } from './hooks/useIdleTimer';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import FDCalculator from './components/Calculator/FDCalculator';
import ProductList from './components/Product/ProductList';
import CustomerList from './components/Customer/CustomerList';
import CustomerCreation from './components/Customer/CustomerCreation';
import CustomerInquiry from './components/Customer/CustomerInquiry';
import CustomerDetails from './components/Customer/CustomerDetails';
import Customer360View from './components/Customer/Customer360View';
import ModuleProtectedRoute from './components/Auth/ModuleProtectedRoute';
import { MODULES } from './utils/permissions';

// Protected Route Component (for basic authentication without module check)
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

function AppContent() {
  // Enable idle timeout monitoring
  useIdleTimer();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {/* Register route removed - Use Customer Creation instead */}
          {/* <Route path="/register" element={<Register />} /> */}
          {/* Public access to products */}
          <Route path="/products" element={<ProductList />} />
          {/* Public access to FD calculator */}
          <Route path="/fd-calculator" element={<FDCalculator />} />
          {/* Public Customer Creation - Anyone can create account */}
          <Route path="/customers/create" element={<CustomerCreation />} />
          {/* Customers - requires CUSTOMERS module permission */}
          <Route
            path="/customers"
            element={
              <ModuleProtectedRoute module={MODULES.CUSTOMERS}>
                <CustomerList />
              </ModuleProtectedRoute>
            }
          />
          {/* Customer Inquiry - Search/Filter */}
          <Route
            path="/customers/search"
            element={
              <ModuleProtectedRoute module={MODULES.CUSTOMERS}>
                <CustomerInquiry />
              </ModuleProtectedRoute>
            }
          />
          {/* Customer 360 View */}
          <Route
            path="/customers/:id/360-view"
            element={
              <ModuleProtectedRoute module={MODULES.CUSTOMERS}>
                <Customer360View />
              </ModuleProtectedRoute>
            }
          />
          {/* Customer Details - Must be last to avoid route conflicts */}
          <Route
            path="/customers/:id"
            element={
              <ModuleProtectedRoute module={MODULES.CUSTOMERS}>
                <CustomerDetails />
              </ModuleProtectedRoute>
            }
          />
          {/* Dashboard - requires DASHBOARD module permission */}
          <Route
            path="/dashboard"
            element={
              <ModuleProtectedRoute module={MODULES.DASHBOARD}>
                <Dashboard />
              </ModuleProtectedRoute>
            }
          />
          {/* My Accounts - requires FD_ACCOUNTS module permission */}
          <Route
            path="/my-accounts"
            element={
              <ModuleProtectedRoute module={MODULES.FD_ACCOUNTS}>
                <Dashboard />
              </ModuleProtectedRoute>
            }
          />
          {/* Profile - requires authentication but no specific module */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Profile Page</h1>
                    <p className="text-gray-600">Coming soon...</p>
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
