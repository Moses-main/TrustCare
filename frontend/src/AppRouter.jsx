import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

// Layouts
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";

// Public Pages
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Unauthorized from "./pages/Unauthorized";

// Protected Pages - Patient
import PatientDashboard from "./pages/Patient/Dashboard";
import Appointments from "./pages/Patient/Appointments";
import MedicalRecords from "./pages/Provider/MedicalRecords";
import Billing from "./pages/Patient/Billing";
import Messages from "./pages/Provider/Messages";

// Protected Pages - Provider
import ProviderDashboard from "./pages/Provider/Dashboard";
import ProviderAppointments from "./pages/Provider/Appointments";
import PatientList from "./pages/Provider/Patients";
import ProviderBilling from "./pages/Provider/Billing";

// Common Components
import Settings from "./pages/Common/Settings";
import Profile from "./pages/Common/Profile";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; // Add a proper loading component
  }

  if (!user) {
    // Store the attempted URL the user came from
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Redirect to the appropriate dashboard if user has a different role
    const redirectPath =
      user.role === "patient" ? "/patient/dashboard" : "/provider/dashboard";
    return <Navigate to={redirectPath} replace />;
  }

  // If user is authenticated and has the right role, render the children
  return children;
};

const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />
      </Route>

      {/* Patient Routes */}
      <Route path="/patient" element={<DashboardLayout role="patient" />}>
        <Route index element={<PatientDashboard />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="medical-records" element={<MedicalRecords />} />
        <Route path="billing" element={<Billing />} />
        <Route path="messages" element={<Messages />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Provider Routes */}
      <Route path="/provider" element={<DashboardLayout role="provider" />}>
        <Route index element={<ProviderDashboard />} />
        <Route path="appointments" element={<ProviderAppointments />} />
        <Route path="patients" element={<PatientList />} />
        <Route path="billing" element={<ProviderBilling />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Redirect any other routes to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
