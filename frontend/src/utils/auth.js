// Utility functions for authentication

export const setAuthToken = (token, user) => {
  if (token && user) {
    const userData = {
      ...user,
      token,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours from now
    };
    localStorage.setItem('user', JSON.stringify(userData));
  }
};

export const getAuthToken = () => {
  const userData = JSON.parse(localStorage.getItem('user') || '{}');
  
  // Check if token exists and is not expired
  if (userData.token && userData.expiresAt > Date.now()) {
    return userData.token;
  }
  
  // Clear invalid/expired token
  if (userData.token) {
    localStorage.removeItem('user');
  }
  
  return null;
};

export const getCurrentUser = () => {
  const userData = JSON.parse(localStorage.getItem('user') || '{}');
  
  // Return user data only if token is valid
  if (userData.token && userData.expiresAt > Date.now()) {
    // Remove sensitive data before returning
    const { token, expiresAt, ...user } = userData;
    return user;
  }
  
  return null;
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};

export const logout = () => {
  localStorage.removeItem('user');
  window.location.href = '/';
};
