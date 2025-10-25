import api, { SERVICES } from './api';

const productService = {
  // Get all products
  getAllProducts: async (page = 0, size = 10) => {
    const response = await api.get(`${SERVICES.PRODUCT}?page=${page}&size=${size}`);
    return response.data;
  },

  // Get product by ID
  getProductById: async (id) => {
    const response = await api.get(`${SERVICES.PRODUCT}/${id}`);
    return response.data;
  },

  // Get product by code
  getProductByCode: async (code) => {
    const response = await api.get(`${SERVICES.PRODUCT}/code/${code}`);
    return response.data;
  },

  // Create new product
  createProduct: async (productData) => {
    const response = await api.post(SERVICES.PRODUCT, productData);
    return response.data;
  },

  // Update product
  updateProduct: async (id, productData) => {
    const response = await api.put(`${SERVICES.PRODUCT}/${id}`, productData);
    return response.data;
  },

  // Delete product
  deleteProduct: async (id) => {
    const response = await api.delete(`${SERVICES.PRODUCT}/${id}`);
    return response.data;
  },

  // Get interest rates for product
  getInterestRates: async (productId) => {
    const response = await api.get(`${SERVICES.PRODUCT}/${productId}/interest-rates`);
    return response.data;
  },

  // Get applicable interest rate
  getApplicableRate: async (productId, amount, termMonths, classification) => {
    const params = new URLSearchParams({ amount, termMonths });
    if (classification) params.append('classification', classification);
    const response = await api.get(`${SERVICES.PRODUCT}/${productId}/interest-rates/applicable?${params}`);
    return response.data;
  },
};

export default productService;
