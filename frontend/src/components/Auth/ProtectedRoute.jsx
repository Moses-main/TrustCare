import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

/**
 * ProtectedRoute component that handles authentication and role-based access control
 * 
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components to render if authenticated
 * @param {string[]} [props.allowedRoles] - Array of allowed user roles (e.g., ['patient', 'provider'])
 * @param {string} [props.redirectTo] - Path to redirect to if not authenticated
 * @returns {JSX.Element} Rendered component or redirect
 */
const ProtectedRoute = ({ 
  children, 
  allowedRoles = [], 
  redirectTo = '/login',
  ...rest 
}) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // Show loading spinner or skeleton
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page with the current location to redirect back after login
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Check if user has the required role
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Redirect to unauthorized page or home
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  // If email verification is required and email is not verified
  if (rest.requireVerifiedEmail && !user.emailVerified) {
    return (
      <Navigate 
        to="/verify-email" 
        state={{ 
          from: location,
          email: user.email 
        }} 
        replace 
      />
    );
  }

  // If all checks pass, render the children
  return children;
};

export default ProtectedRoute;
