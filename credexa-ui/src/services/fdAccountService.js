import api, { SERVICES } from './api';

const fdAccountService = {
  // Create FD account
  createAccount: async (accountData) => {
    const response = await api.post(SERVICES.FD_ACCOUNT, accountData);
    return response.data;
  },

  // Get account by ID
  getAccountById: async (id) => {
    const response = await api.get(`${SERVICES.FD_ACCOUNT}/${id}`);
    return response.data;
  },

  // Get account by account number
  getAccountByNumber: async (accountNumber) => {
    const response = await api.get(`${SERVICES.FD_ACCOUNT}/number/${accountNumber}`);
    return response.data;
  },

  // Get accounts by customer ID
  getAccountsByCustomer: async (customerId) => {
    const response = await api.get(`${SERVICES.FD_ACCOUNT}/customer/${customerId}`);
    return response.data;
  },

  // Update account
  updateAccount: async (id, accountData) => {
    const response = await api.put(`${SERVICES.FD_ACCOUNT}/${id}`, accountData);
    return response.data;
  },

  // Close account
  closeAccount: async (id, closureData) => {
    const response = await api.post(`${SERVICES.FD_ACCOUNT}/${id}/close`, closureData);
    return response.data;
  },

  // Get account transactions
  getTransactions: async (accountId) => {
    const response = await api.get(`${SERVICES.FD_ACCOUNT}/${accountId}/transactions`);
    return response.data;
  },

  // Get account balances
  getBalances: async (accountId) => {
    const response = await api.get(`${SERVICES.FD_ACCOUNT}/${accountId}/balances`);
    return response.data;
  },

  // Premature withdrawal
  prematureWithdrawal: async (accountId, withdrawalData) => {
    const response = await api.post(`${SERVICES.FD_ACCOUNT}/${accountId}/premature-withdrawal`, withdrawalData);
    return response.data;
  },
};

export default fdAccountService;
