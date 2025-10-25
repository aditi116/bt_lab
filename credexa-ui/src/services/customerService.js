import api, { SERVICES } from './api';

const customerService = {
  // Create new customer
  createCustomer: async (customerData) => {
    const response = await api.post(SERVICES.CUSTOMER, customerData);
    return response.data;
  },

  // Get customer by ID
  getCustomerById: async (id) => {
    const response = await api.get(`${SERVICES.CUSTOMER}/${id}`);
    return response.data;
  },

  // Get customer by user ID
  getCustomerByUserId: async (userId) => {
    const response = await api.get(`${SERVICES.CUSTOMER}/user/${userId}`);
    return response.data;
  },

  // Update customer
  updateCustomer: async (id, customerData) => {
    const response = await api.put(`${SERVICES.CUSTOMER}/${id}`, customerData);
    return response.data;
  },

  // Get customer classification
  getCustomerClassification: async (id) => {
    const response = await api.get(`${SERVICES.CUSTOMER}/${id}/classification`);
    return response.data;
  },

  // Get all customers (if admin endpoint exists)
  getAllCustomers: async () => {
    const response = await api.get(SERVICES.CUSTOMER);
    return response.data;
  },
};

export default customerService;
