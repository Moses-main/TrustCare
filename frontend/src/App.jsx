import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts";
import AppRouter from "./AppRouter";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import LoadingSpinner from "./components/Common/LoadingSpinner";
import { useAuth } from "./contexts";

function AppContent() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <AppRouter />
      </main>
      {/* <Footer /> */}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
