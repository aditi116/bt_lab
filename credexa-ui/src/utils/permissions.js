// Module permissions configuration
export const MODULES = {
  DASHBOARD: 'dashboard',
  CUSTOMERS: 'customers',
  PRODUCTS: 'products',
  FD_ACCOUNTS: 'fd_accounts',
  CALCULATOR: 'calculator',
  REPORTS: 'reports',
  SETTINGS: 'settings',
};

// Role to module permissions mapping
export const ROLE_PERMISSIONS = {
  ROLE_ADMIN: [
    MODULES.DASHBOARD,
    MODULES.CUSTOMERS,
    MODULES.PRODUCTS,
    MODULES.FD_ACCOUNTS,
    MODULES.CALCULATOR,
    MODULES.REPORTS,
    MODULES.SETTINGS,
  ],
  ROLE_USER: [
    MODULES.DASHBOARD,
    MODULES.CALCULATOR,
    MODULES.PRODUCTS,
  ],
  ROLE_CUSTOMER_MANAGER: [
    MODULES.DASHBOARD,
    MODULES.CUSTOMERS,
    MODULES.FD_ACCOUNTS,
  ],
  ROLE_PRODUCT_MANAGER: [
    MODULES.DASHBOARD,
    MODULES.PRODUCTS,
    MODULES.CALCULATOR,
  ],
  ROLE_FD_MANAGER: [
    MODULES.DASHBOARD,
    MODULES.FD_ACCOUNTS,
    MODULES.CALCULATOR,
  ],
  ROLE_REPORT_VIEWER: [
    MODULES.DASHBOARD,
    MODULES.REPORTS,
  ],
};

/**
 * Check if user has permission to access a module
 * @param {Array<string>} userRoles - Array of user role names
 * @param {string} module - Module name from MODULES
 * @returns {boolean} - True if user has permission
 */
export const hasModulePermission = (userRoles, module) => {
  if (!userRoles || userRoles.length === 0) {
    return false;
  }

  // Check if any of the user's roles has permission for this module
  return userRoles.some(role => {
    const permissions = ROLE_PERMISSIONS[role];
    return permissions && permissions.includes(module);
  });
};

/**
 * Get all accessible modules for a user
 * @param {Array<string>} userRoles - Array of user role names
 * @returns {Array<string>} - Array of accessible module names
 */
export const getUserModules = (userRoles) => {
  if (!userRoles || userRoles.length === 0) {
    return [];
  }

  const modules = new Set();
  userRoles.forEach(role => {
    const permissions = ROLE_PERMISSIONS[role];
    if (permissions) {
      permissions.forEach(module => modules.add(module));
    }
  });

  return Array.from(modules);
};
