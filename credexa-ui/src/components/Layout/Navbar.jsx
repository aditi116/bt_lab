import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-primary-500 to-secondary-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="/logo.png" 
                alt="Credexa Logo" 
                className="h-10 w-10"
              />
              <span className="text-2xl font-bold text-white">Credexa</span>
            </Link>
            
            {isAuthenticated && (
              <div className="hidden md:ml-10 md:flex md:space-x-8">
                <Link
                  to="/dashboard"
                  className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition"
                >
                  Dashboard
                </Link>
                <Link
                  to="/customers"
                  className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition"
                >
                  Customers
                </Link>
                <Link
                  to="/products"
                  className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition"
                >
                  Products
                </Link>
                <Link
                  to="/fd-calculator"
                  className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition"
                >
                  Calculator
                </Link>
                <Link
                  to="/my-accounts"
                  className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition"
                >
                  My Accounts
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-white text-sm">
                  Welcome, <span className="font-semibold">{user?.username || 'User'}</span>
                </span>
                <Link
                  to="/profile"
                  className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-white text-primary-600 hover:bg-gray-100 px-4 py-2 rounded-md text-sm font-medium transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium transition"
                >
                  Login
                </Link>
                {/* Register removed - Use Customer Creation page instead */}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
