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

import { AuthProvider } from "@/contexts/AuthContext";
import { UserProvider } from "@/contexts/UserContext";

import MainLayout from "@/layouts/MainLayout";

const Login = lazy(() => import("@/pages/Auth/Login"));
const Signup = lazy(() => import("@/pages/Auth/Signup"));

const Landing = lazy(() => import("@/pages/Landing/Landing"));
const About = lazy(() => import("@/pages/Info/About"));
const Contact = lazy(() => import("@/pages/Info/Contact"));

const ProfileSettings = lazy(() => import("@/pages/Common/ProfileSettings"));

const PatientDashboard = lazy(() => import("@/pages/Patient/Dashboard"));
const Appointments = lazy(() => import("@/pages/patient/Appointments"));
const MedicalRecords = lazy(() => import("@/pages/patient/MedicalRecords"));
const HealthMetrics = lazy(() => import("@/pages/patient/HealthMetrics"));
const Medications = lazy(() => import("@/pages/patient/Medications"));

const ProviderDashboard = lazy(() => import("@/pages/Provider/Dashboard"));
const ProviderAppointments = lazy(() => import("@/pages/Provider/Appointments"));
const ProviderRecords = lazy(() => import("@/pages/provider/ProviderRecords"));
const PatientManagement = lazy(() => import("@/pages/Provider/PatientManagement"));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const AuthenticatedLayout = () => {
  return (
    <MainLayout>
      <Suspense fallback={<LoadingSpinner />}>
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Navigate to="/landing" replace />} />

                <Route
                  path="/landing"
                  element={
                    <MainLayout>
                      <Landing />
                    </MainLayout>
                  }
                />

                <Route
                  path="/about"
                  element={
                    <MainLayout>
                      <About />
                    </MainLayout>
                  }
                />

                <Route
                  path="/contact"
                  element={
                    <MainLayout>
                      <Contact />
                    </MainLayout>
                  }
                />

                <Route
                  path="/login"
                  element={<Navigate to="/landing" replace />}
                />
                <Route
                  path="/register"
                  element={<Navigate to="/landing" replace />}
                />

                <Route path="/patient" element={<AuthenticatedLayout />}>
                  <Route index element={<Navigate to="dashboard" replace />} />
                  <Route path="dashboard" element={<PatientDashboard />} />
                  <Route
                    path="profile"
                    element={<Navigate to="/patient/dashboard" replace />}
                  />
                  <Route path="appointments" element={<Appointments />} />
                  <Route path="medical-records" element={<MedicalRecords />} />
                  <Route path="health-metrics" element={<HealthMetrics />} />
                  <Route path="medications" element={<Medications />} />
                </Route>

                <Route
                  path="/provider/profile"
                  element={<Navigate to="/provider/dashboard" replace />}
                />
                <Route
                  path="/patient/profile"
                  element={<Navigate to="/patient/dashboard" replace />}
                />

                <Route path="/provider" element={<AuthenticatedLayout />}>
                  <Route index element={<Navigate to="dashboard" replace />} />
                  <Route path="dashboard" element={<ProviderDashboard />} />
                  <Route path="appointments" element={<ProviderAppointments />} />
                  <Route path="patients" element={<PatientManagement />} />
                  <Route path="records" element={<ProviderRecords />} />
                  <Route path="profile" element={<ProfileSettings />} />
                  
                  <Route path="patients/:id" element={<div>Patient Details</div>} />
                  <Route path="patients/:id/records" element={<div>Patient Medical Records</div>} />
                </Route>

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

                <Route path="*" element={<Navigate to="/landing" replace />} />
                <Route
                  path="/profile/settings"
                  element={
                    <MainLayout>
                      <ProfileSettings />
                    </MainLayout>
                  }
                />
              </Routes>
            </Suspense>
            <ToastContainer position="bottom-right" autoClose={5000} />
          </div>
        </Router>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
