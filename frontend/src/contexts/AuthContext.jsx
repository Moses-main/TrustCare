import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { user, ready, authenticated, logout: privyLogout, login: privyLogin } = usePrivy();
  const [appUser, setAppUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ready) {
      if (authenticated && user) {
        const userData = {
          id: user.id,
          email: user.email?.address || null,
          walletAddress: user.wallet?.address || null,
          name: user.email?.address?.split('@')[0] || 'User',
        };
        setAppUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('isAuthenticated', 'true');
      } else {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setAppUser(JSON.parse(storedUser));
        }
      }
      setLoading(false);
    }
  }, [ready, authenticated, user]);

  const login = (userData) => {
    setAppUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isAuthenticated', 'true');
  };

  const logout = async () => {
    try {
      await privyLogout();
    } catch (e) {
      console.log('Privy logout error:', e);
    }
    setAppUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <AuthContext.Provider value={{ 
      user: appUser, 
      loading: loading || !ready, 
      login, 
      logout,
      isAuthenticated: authenticated,
      privyUser: user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
