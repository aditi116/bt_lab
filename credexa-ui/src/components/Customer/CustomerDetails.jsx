import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import customerService from '../../services/customerService';

const CustomerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [classification, setClassification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCustomerDetails();
  }, [id]);

  const fetchCustomerDetails = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Fetch customer details and classification in parallel
      const [customerData, classificationData] = await Promise.all([
        customerService.getCustomerById(id),
        customerService.getCustomerClassification(id)
      ]);
      
      setCustomer(customerData);
      setClassification(classificationData);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load customer details');
      console.error('Error fetching customer:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading customer details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/customers')}
            className="btn-primary"
          >
            Back to Customers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{customer.name}</h1>
            <p className="mt-2 text-gray-600">Customer ID: {customer.customerId}</p>
          </div>
          <button
            onClick={() => navigate('/customers')}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            ← Back to List
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Personal Information */}
          <div className="lg:col-span-2 bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="text-gray-900 font-medium">{customer.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-900 font-medium">{customer.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Mobile Number</p>
                <p className="text-gray-900 font-medium">{customer.mobileNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">PAN Number</p>
                <p className="text-gray-900 font-medium">{customer.panNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="text-gray-900 font-medium">
                  {customer.dateOfBirth ? new Date(customer.dateOfBirth).toLocaleDateString() : '-'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                <p className="text-gray-900 font-medium">{customer.gender || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Occupation</p>
                <p className="text-gray-900 font-medium">{customer.occupation || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Annual Income</p>
                <p className="text-gray-900 font-medium">
                  {customer.annualIncome ? `₹${customer.annualIncome.toLocaleString()}` : '-'}
                </p>
              </div>
            </div>

            {/* Address */}
            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Address</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-900">{customer.addressLine1}</p>
              {customer.addressLine2 && <p className="text-gray-900">{customer.addressLine2}</p>}
              <p className="text-gray-900">
                {customer.city}, {customer.state} - {customer.pincode}
              </p>
              <p className="text-gray-900">{customer.country}</p>
            </div>

            {/* Classification for FD Rate */}
            {classification && (
              <>
                <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                  Classification (For FD Rate)
                </h3>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-blue-700">Category</p>
                      <p className="text-blue-900 font-semibold text-lg">
                        {classification.category}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-blue-700">FD Rate Modifier</p>
                      <p className="text-blue-900 font-semibold text-lg">
                        {classification.rateModifier > 0 ? '+' : ''}{classification.rateModifier}%
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-blue-600 mt-3">
                    💡 <strong>{classification.category}</strong> customers get{' '}
                    {classification.rateModifier > 0 ? 'additional' : 'standard'}{' '}
                    {Math.abs(classification.rateModifier)}% on FD interest rates
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Status Card */}
          <div className="space-y-6">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Status</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Account Status</p>
                  <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Customer Since</p>
                  <p className="text-gray-900 font-medium">
                    {customer.createdAt ? new Date(customer.createdAt).toLocaleDateString() : '-'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Updated</p>
                  <p className="text-gray-900 font-medium">
                    {customer.updatedAt ? new Date(customer.updatedAt).toLocaleDateString() : '-'}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <button
                  onClick={() => navigate(`/customers/${id}/360-view`)}
                  className="w-full btn-primary text-sm"
                >
                  📊 360° View
                </button>
                <button
                  onClick={() => navigate(`/customers/${id}/edit`)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm"
                >
                  ✏️ Edit Details
                </button>
                <button
                  onClick={() => navigate(`/fd-accounts/create?customerId=${id}`)}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                >
                  💰 Create FD Account
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Note */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>📄 Note:</strong> This customer information is used in Reports, Statements, and Notices.
            Name and Address details are printed on official documents.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
