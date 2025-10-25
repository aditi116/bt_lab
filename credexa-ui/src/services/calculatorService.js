import api, { SERVICES } from './api';

const calculatorService = {
  // Calculate FD maturity (standalone)
  calculateStandalone: async (calculationData) => {
    const response = await api.post(`${SERVICES.FD_CALCULATOR}/calculate/standalone`, calculationData);
    return response.data;
  },

  // Calculate FD maturity (product-based)
  calculateWithProduct: async (calculationData) => {
    const response = await api.post(`${SERVICES.FD_CALCULATOR}/calculate/product-based`, calculationData);
    return response.data;
  },

  // Quick calculation
  quickCalculate: async (principal, rate, months) => {
    const calculationData = {
      principalAmount: principal,
      interestRate: rate,
      tenure: months,
      tenureUnit: 'MONTHS',
      calculationType: 'COMPOUND',
      compoundingFrequency: 'QUARTERLY',
    };
    return await calculatorService.calculateStandalone(calculationData);
  },
};

export default calculatorService;
