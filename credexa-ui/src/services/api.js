import axios from 'axios';

// Base API configuration
const api = axios.create({
  baseURL: 'http://localhost',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Service URLs
export const SERVICES = {
  LOGIN: 'http://localhost:8081/api/auth',
  CUSTOMER: 'http://localhost:8083/api/customer/customers',
  PRODUCT: 'http://localhost:8084/api/products',
  EMAIL: 'http://localhost:8085/api/emails',
  FD_ACCOUNT: 'http://localhost:8086/api/accounts',
  FD_CALCULATOR: 'http://localhost:8087/api/calculator',
};

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
