import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { authAPI } from '../services/api';
import { toast } from 'react-toastify';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Load user from token on initial load
  const loadUser = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const userData = await authAPI.getMe();
        setUser(userData);
      }
    } catch (error) {
      console.error('Error loading user:', error);
      // Clear invalid token
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load user on mount
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  /**
   * Login user with email and password
   * @param {Object} credentials - User credentials
   * @param {string} credentials.email - User's email
   * @param {string} credentials.password - User's password
   * @param {string} [userType] - User type (patient/doctor)
   * @returns {Promise<Object>} User data and auth token
   */
  const login = async ({ email, password, userType }) => {
    try {
      setIsAuthenticating(true);
      const response = await authAPI.login({ email, password });
      
      if (response?.token) {
        localStorage.setItem('token', response.token);
        
        // If user data is included in the response, use it
        if (response.user) {
          setUser(response.user);
        } else {
          // Otherwise, fetch the user data
          const userData = await authAPI.getMe();
          setUser(userData);
        }
        
        return response;
      }
      
      throw new Error('No token received from server');
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  /**
   * Logout the current user
   */
  const logout = () => {
    try {
      localStorage.removeItem('token');
      setUser(null);
      // Optionally call a logout endpoint if available
      // await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  /**
   * Update current user's profile
   * @param {Object} userData - Updated user data
   * @returns {Promise<Object>} Updated user data
   */
  const updateUserProfile = async (userData) => {
    try {
      const updatedUser = await authAPI.updateMe(userData);
      setUser(prev => ({
        ...prev,
        ...updatedUser
      }));
      
      toast.success('Profile updated successfully!', {
        position: 'top-center',
        autoClose: 3000
      });
      
      return updatedUser;
    } catch (error) {
      console.error('Update profile error:', error);
      toast.error(error.message || 'Failed to update profile. Please try again.', {
        position: 'top-center'
      });
      throw error;
    }
  };

  // Context value
  const value = {
    user,
    loading,
    isAuthenticating,
    isAuthenticated: !!user,
    login,
    logout,
    updateUser: updateUserProfile,
    refreshUser: loadUser
  };

  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
};

/**
 * Hook to use the user context
 * @returns {Object} User context with user data and auth methods
 */
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
