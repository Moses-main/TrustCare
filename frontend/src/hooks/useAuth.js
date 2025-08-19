// src/hooks/useAuth.js
import { useEffect, useMemo, useState } from 'react';

// Very light auth placeholder using localStorage for demo
// userType: 'patient' | 'provider'
export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => {
      const token = localStorage.getItem('dhrs_token');
      const role = localStorage.getItem('dhrs_user_type');
      setIsAuthenticated(!!token);
      setUserType(role || null);
      setLoading(false);
    }, 200);
    return () => clearTimeout(t);
  }, []);

  const login = (role = 'patient') => {
    localStorage.setItem('dhrs_token', 'demo');
    localStorage.setItem('dhrs_user_type', role);
    setIsAuthenticated(true);
    setUserType(role);
  };

  const logout = () => {
    localStorage.removeItem('dhrs_token');
    localStorage.removeItem('dhrs_user_type');
    setIsAuthenticated(false);
    setUserType(null);
  };

  return useMemo(() => ({
    loading,
    isAuthenticated,
    userType,
    login,
    logout,
  }), [loading, isAuthenticated, userType]);
};
