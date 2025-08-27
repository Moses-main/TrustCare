import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  console.log('ProtectedRoute - Auth state:', { user, loading });
  console.log('Current location:', location.pathname);
  console.log('Allowed roles:', allowedRoles);

  if (loading) {
    console.log('Auth loading, showing spinner...');
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!user) {
    console.log('No user found, redirecting to login...');
    // Store the current location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has required role
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    console.log('User does not have required role, redirecting to unauthorized...');
    return <Navigate to="/unauthorized" replace />;
  }

  console.log('User authenticated, rendering protected content');
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
};

export default ProtectedRoute;
