import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const toast = useToast();

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuth = async () => {
      console.log('Checking authentication status...');
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.log('No token found, user is not authenticated');
        setLoading(false);
        return;
      }

      try {
        console.log('Token found, validating with server...');
        const response = await authAPI.getMe();
        console.log('Auth response:', response);
        
        if (response?.data) {
          console.log('User authenticated:', response.data);
          setUser(response.data);
        } else {
          throw new Error('Invalid response from server');
        }
      } catch (err) {
        console.error('Authentication check failed:', err);
        setUser(null);
        localStorage.removeItem('token');
        
        toast({
          title: 'Session expired',
          description: 'Please log in again',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    // Add a small delay to prevent race conditions
    const timer = setTimeout(() => {
      checkAuth().catch(console.error);
    }, 100);

    return () => clearTimeout(timer);
  }, [toast]);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.login(credentials);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      setUser(user);
      setLoading(false);
      return user;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      setLoading(false);
      throw err;
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.register(userData);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      setUser(user);
      setLoading(false);
      return user;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      setLoading(false);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  const updateUser = (updatedUser) => {
    setUser(prev => ({
      ...prev,
      ...updatedUser
    }));
  };

  const value = React.useMemo(() => ({
    user,
    loading,
    error,
    isAuthenticated: !!user,
    isPatient: user?.role === 'patient',
    isProvider: ['doctor', 'nurse', 'staff'].includes(user?.role),
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout,
    updateUser,
  }), [user, loading, error, login, register, logout, updateUser]);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
