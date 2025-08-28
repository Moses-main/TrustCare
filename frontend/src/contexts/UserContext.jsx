import { createContext, useContext, useEffect, useState } from 'react';
import { authAPI } from '../services/api';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on initial load
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await authAPI.getMe();
          setUser(response.data);
        }
      } catch (error) {
        console.error('Error loading user:', error);
        // Clear invalid token
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (credentials) => {
    const response = await authAPI.login(credentials);
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    setUser(user);
    return user;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const updateUser = async (userData) => {
    try {
      const response = await authAPI.updateMe(userData);
      setUser(prev => ({ ...prev, ...response.data }));
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, login, logout, updateUser }}>
      {!loading && children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
