import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { getCurrentUser, isAuthenticated } from '../../utils/auth';

const ProtectedRoute = ({ children, userType, redirectTo = '/login' }) => {
  const user = getCurrentUser();
  const location = useLocation();
  const navigate = useNavigate();

  // Check authentication and redirect if needed
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate(redirectTo, { 
        state: { from: location },
        replace: true 
      });
    } else if (userType && user?.role !== userType) {
      navigate('/unauthorized', { replace: true });
    }
  }, [user, userType, location, navigate, redirectTo]);

  // Show loading state while checking auth
  if (!isAuthenticated() || (userType && user?.role !== userType)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
