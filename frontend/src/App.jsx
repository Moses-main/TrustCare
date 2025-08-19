// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { useWeb3 } from './hooks/useWeb3';

// Components
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import LoadingSpinner from './components/Common/LoadingSpinner';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import PatientDashboard from './pages/Patient/Dashboard';
import ProviderDashboard from './pages/Provider/Dashboard';
import MedicalRecords from './pages/Records/MedicalRecords';
import AccessManagement from './pages/Patient/AccessManagement';
import CreateRecord from './pages/Provider/CreateRecord';
import About from './pages/Info/About';
import Privacy from './pages/Info/Privacy';
import Terms from './pages/Info/Terms';
import Contact from './pages/Info/Contact';
import Notifications from './pages/Common/Notifications';
import Messages from './pages/Common/Messages';
import Profile from './pages/Common/Profile';
import Settings from './pages/Common/Settings';
import Appointments from './pages/Patient/Appointments';
import Patients from './pages/Provider/Patients';
import Invoices from './pages/Billing/Invoices';
import RecordDetail from './pages/Records/RecordDetail';
import Medications from './pages/Patient/Medications';
import Wellness from './pages/Patient/Wellness';
import CareTeam from './pages/Patient/CareTeam';

function App() {
  const { isAuthenticated, userType, loading: authLoading } = useAuth();
  const { loading: web3Loading } = useWeb3();

  if (authLoading || web3Loading) return <LoadingSpinner />;

  return (
    <Router>
      <div className="App">
        <Navbar />
        <main style={{ minHeight: 'calc(100vh - 140px)', paddingTop: 80 }}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
            <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />

            {/* Simulated (unprotected) routes */}
            <Route
              path="/dashboard"
              element={userType === 'provider' ? <ProviderDashboard /> : <PatientDashboard />}
            />
            <Route path="/records" element={<MedicalRecords />} />
            <Route path="/records/:id" element={<RecordDetail />} />
            <Route path="/access-management" element={<AccessManagement />} />
            <Route path="/create-record" element={<CreateRecord />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/medications" element={<Medications />} />
            <Route path="/wellness" element={<Wellness />} />
            <Route path="/care-team" element={<CareTeam />} />

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
