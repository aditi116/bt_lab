import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import customerService from '../../services/customerService';
import fdAccountService from '../../services/fdAccountService';

const Dashboard = () => {
  const { user } = useAuth();
  const [customerData, setCustomerData] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch customer profile
      const customerResponse = await customerService.getCustomerByUserId(user.userId);
      if (customerResponse.success) {
        setCustomerData(customerResponse.data);
        
        // Fetch FD accounts
        const accountsResponse = await fdAccountService.getAccountsByCustomer(customerResponse.data.customerId);
        if (accountsResponse.success) {
          setAccounts(accountsResponse.data || []);
        }
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Set empty data instead of failing completely
      setCustomerData(null);
      setAccounts([]);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const totalInvestment = accounts.reduce((sum, acc) => sum + parseFloat(acc.principalAmount || 0), 0);
  const totalMaturityValue = accounts.reduce((sum, acc) => sum + parseFloat(acc.maturityAmount || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-600 rounded-lg shadow-lg p-8 text-white mb-8">
          <h1 className="text-3xl font-bold">Welcome back, {user?.fullName || user?.username}!</h1>
          <p className="mt-2 text-primary-100">Here's an overview of your Fixed Deposits</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total FD Accounts</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{accounts.length}</p>
              </div>
              <div className="bg-primary-100 p-3 rounded-full">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Investment</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{formatCurrency(totalInvestment)}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expected Maturity</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{formatCurrency(totalMaturityValue)}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link to="/fd-calculator" className="card hover:shadow-lg transition text-center">
              <div className="text-primary-600 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">Calculate FD</h3>
              <p className="text-sm text-gray-600 mt-1">Plan your investments</p>
            </Link>

            <Link to="/products" className="card hover:shadow-lg transition text-center">
              <div className="text-green-600 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">Browse Products</h3>
              <p className="text-sm text-gray-600 mt-1">Explore FD options</p>
            </Link>

            <Link to="/create-account" className="card hover:shadow-lg transition text-center">
              <div className="text-blue-600 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">Open FD Account</h3>
              <p className="text-sm text-gray-600 mt-1">Start investing today</p>
            </Link>

            <Link to="/profile" className="card hover:shadow-lg transition text-center">
              <div className="text-purple-600 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900">Manage Profile</h3>
              <p className="text-sm text-gray-600 mt-1">Update your details</p>
            </Link>
          </div>
        </div>

        {/* Recent FD Accounts */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Your FD Accounts</h2>
            <Link to="/my-accounts" className="text-primary-600 hover:text-primary-700 font-medium">
              View All →
            </Link>
          </div>

          {accounts.length === 0 ? (
            <div className="card text-center py-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No FD Accounts Yet</h3>
              <p className="text-gray-600 mb-4">Start your investment journey by opening your first FD account</p>
              <Link to="/create-account" className="btn-primary inline-block">
                Open FD Account
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accounts.slice(0, 6).map((account) => (
                <div key={account.id} className="card hover:shadow-lg transition">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Account Number</p>
                      <p className="font-semibold text-gray-900">{account.accountNumber}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      account.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                      account.status === 'MATURED' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {account.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Principal:</span>
                      <span className="font-medium">{formatCurrency(account.principalAmount)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Rate:</span>
                      <span className="font-medium">{account.interestRate}% p.a.</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Maturity:</span>
                      <span className="font-medium">{formatCurrency(account.maturityAmount)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Maturity Date:</span>
                      <span className="font-medium">{formatDate(account.maturityDate)}</span>
                    </div>
                  </div>
                  
                  <Link
                    to={`/accounts/${account.id}`}
                    className="block text-center btn-secondary w-full"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
