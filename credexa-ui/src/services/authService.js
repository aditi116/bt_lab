import api, { SERVICES } from './api';

const authService = {
  // Register new user
  register: async (userData) => {
    const response = await api.post(`${SERVICES.LOGIN}/register`, userData);
    return response.data;
  },

  // Login user
  login: async (credentials) => {
    const response = await api.post(`${SERVICES.LOGIN}/login`, credentials);
    if (response.data.success && response.data.data.token) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    return response.data;
  },

  // Logout user
  logout: async () => {
    try {
      await api.post(`${SERVICES.LOGIN}/logout`);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  // Validate token
  validateToken: async (token) => {
    const response = await api.post(`${SERVICES.LOGIN}/validate-token`, { token });
    return response.data;
  },

  // Get current user
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Get user profile
  getProfile: async () => {
    const response = await api.get(`${SERVICES.LOGIN}/profile`);
    return response.data;
  },

  // Update profile
  updateProfile: async (profileData) => {
    const response = await api.put(`${SERVICES.LOGIN}/profile`, profileData);
    return response.data;
  },

  // Change password
  changePassword: async (passwordData) => {
    const response = await api.post(`${SERVICES.LOGIN}/change-password`, passwordData);
    return response.data;
  },
};

export default authService;
