import { useState } from 'react';
import calculatorService from '../../services/calculatorService';

const FDCalculator = () => {
  const [formData, setFormData] = useState({
    principalAmount: '',
    interestRate: '',
    tenure: '',
    tenureUnit: 'MONTHS',
    calculationType: 'COMPOUND',
    compoundingFrequency: 'QUARTERLY',
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCalculate = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const calculationData = {
        ...formData,
        principalAmount: parseFloat(formData.principalAmount),
        interestRate: parseFloat(formData.interestRate),
        tenure: parseInt(formData.tenure),
      };

      const response = await calculatorService.calculateStandalone(calculationData);
      
      if (response.success) {
        setResult(response.data);
      } else {
        setError(response.message || 'Calculation failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during calculation');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      principalAmount: '',
      interestRate: '',
      tenure: '',
      tenureUnit: 'MONTHS',
      calculationType: 'COMPOUND',
      compoundingFrequency: 'QUARTERLY',
    });
    setResult(null);
    setError('');
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
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">FD Calculator</h1>
          <p className="mt-2 text-gray-600">Calculate your Fixed Deposit returns and plan your investments</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Enter Details</h2>
            
            <form onSubmit={handleCalculate} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Principal Amount (₹)
                </label>
                <input
                  type="number"
                  name="principalAmount"
                  required
                  min="10000"
                  step="1000"
                  className="input-field"
                  placeholder="e.g., 100000"
                  value={formData.principalAmount}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Interest Rate (% p.a.)
                </label>
                <input
                  type="number"
                  name="interestRate"
                  required
                  min="0.1"
                  max="15"
                  step="0.1"
                  className="input-field"
                  placeholder="e.g., 6.5"
                  value={formData.interestRate}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tenure
                  </label>
                  <input
                    type="number"
                    name="tenure"
                    required
                    min="1"
                    className="input-field"
                    placeholder="e.g., 12"
                    value={formData.tenure}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tenure Unit
                  </label>
                  <select
                    name="tenureUnit"
                    className="input-field"
                    value={formData.tenureUnit}
                    onChange={handleChange}
                  >
                    <option value="DAYS">Days</option>
                    <option value="MONTHS">Months</option>
                    <option value="YEARS">Years</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Calculation Type
                </label>
                <select
                  name="calculationType"
                  className="input-field"
                  value={formData.calculationType}
                  onChange={handleChange}
                >
                  <option value="SIMPLE">Simple Interest</option>
                  <option value="COMPOUND">Compound Interest</option>
                </select>
              </div>

              {formData.calculationType === 'COMPOUND' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Compounding Frequency
                  </label>
                  <select
                    name="compoundingFrequency"
                    className="input-field"
                    value={formData.compoundingFrequency}
                    onChange={handleChange}
                  >
                    <option value="MONTHLY">Monthly</option>
                    <option value="QUARTERLY">Quarterly</option>
                    <option value="HALF_YEARLY">Half Yearly</option>
                    <option value="ANNUALLY">Annually</option>
                  </select>
                </div>
              )}

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 btn-primary disabled:opacity-50"
                >
                  {loading ? 'Calculating...' : 'Calculate'}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 btn-secondary"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>

          {/* Results */}
          <div>
            {result ? (
              <div className="card">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Calculation Results</h2>
                
                <div className="space-y-6">
                  {/* Summary Cards */}
                  <div className="bg-gradient-to-r from-primary-500 to-secondary-600 rounded-lg p-6 text-white">
                    <p className="text-sm opacity-90 mb-1">Maturity Amount</p>
                    <p className="text-4xl font-bold">{formatCurrency(result.maturityAmount)}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-sm text-green-700 mb-1">Interest Earned</p>
                      <p className="text-2xl font-bold text-green-900">
                        {formatCurrency(result.interestAmount)}
                      </p>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-700 mb-1">Principal</p>
                      <p className="text-2xl font-bold text-blue-900">
                        {formatCurrency(result.principalAmount)}
                      </p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Investment Start:</span>
                      <span className="font-semibold">{formatDate(result.startDate)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Maturity Date:</span>
                      <span className="font-semibold">{formatDate(result.maturityDate)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Effective Rate:</span>
                      <span className="font-semibold">{result.effectiveRate}% p.a.</span>
                    </div>
                    {result.tdsAmount > 0 && (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">TDS Deducted:</span>
                          <span className="font-semibold text-red-600">
                            {formatCurrency(result.tdsAmount)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Net Interest:</span>
                          <span className="font-semibold text-green-600">
                            {formatCurrency(result.netInterest)}
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Return Summary */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Investment Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Total Returns:</span>
                        <span className="font-semibold text-green-600">
                          +{((result.interestAmount / result.principalAmount) * 100).toFixed(2)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Monthly Average:</span>
                        <span className="font-semibold">
                          {formatCurrency(result.interestAmount / result.tenureInMonths)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card h-full flex items-center justify-center text-center">
                <div>
                  <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Calculate Your FD Returns</h3>
                  <p className="text-gray-600">
                    Enter your investment details to see the expected returns
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FDCalculator;
