import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layouts
import MainLayout from "./layouts/MainLayout";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";

// Auth Pages
const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));

// Public Pages
const Landing = lazy(() => import("./pages/Landing"));
const About = lazy(() => import("./pages/Info/About"));
const Contact = lazy(() => import("./pages/Info/Contact"));

// Patient Pages
const PatientDashboard = lazy(() => import("./pages/Patient/Dashboard"));
const Appointments = lazy(() => import("./pages/patient/Appointments"));
const MedicalRecords = lazy(() => import("./pages/patient/MedicalRecords"));
const HealthMetrics = lazy(() => import("./pages/patient/HealthMetrics"));
const Medications = lazy(() => import("./pages/patient/Medications"));

// Provider Pages
const ProviderDashboard = lazy(() => import("./pages/Provider/Dashboard"));
const ProviderAppointments = lazy(
  () => import("./pages/Provider/Appointments")
);
const PatientManagement = lazy(
  () => import("./pages/Provider/PatientManagement")
);

// Loading Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

// Layout Wrapper for authenticated routes
const AuthenticatedLayout = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Root route - redirects to landing */}
            <Route path="/" element={<Navigate to="/landing" replace />} />

            {/* Public Routes */}
            <Route
              path="/landing"
              element={
                <MainLayout>
                  <Landing />
                </MainLayout>
              }
            />

            {/* About Page */}
            <Route
              path="/about"
              element={
                <MainLayout>
                  <About />
                </MainLayout>
              }
            />
            
            {/* Contact Page */}
            <Route
              path="/contact"
              element={
                <MainLayout>
                  <Contact />
                </MainLayout>
              }
            />

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Patient Routes */}
            <Route path="/patient" element={<AuthenticatedLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<PatientDashboard />} />
              <Route path="appointments" element={<Appointments />} />
              <Route path="medical-records" element={<MedicalRecords />} />
              <Route path="health-metrics" element={<HealthMetrics />} />
              <Route path="medications" element={<Medications />} />
            </Route>

            {/* Provider Routes */}
            <Route
              path="/provider"
              element={
                <MainLayout>
                  <ProviderDashboard />
                </MainLayout>
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route
                path="dashboard"
                element={
                  <MainLayout>
                    <ProviderDashboard />
                  </MainLayout>
                }
              />
              <Route
                path="appointments"
                element={
                  <MainLayout>
                    <ProviderAppointments />
                  </MainLayout>
                }
              />
              <Route
                path="patients"
                element={
                  <MainLayout>
                    <PatientManagement />
                  </MainLayout>
                }
              />
            </Route>

            {/* Legacy dashboard route (temporary) */}
            <Route
              path="/dashboard"
              element={
                localStorage.getItem("userType") === "patient" ? (
                  <Navigate to="/patient/dashboard" replace />
                ) : (
                  <Navigate to="/provider/dashboard" replace />
                )
              }
            />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/landing" replace />} />
          </Routes>
        </Suspense>
        <ToastContainer position="bottom-right" autoClose={5000} />
      </div>
    </Router>
  );
}

export default App;
