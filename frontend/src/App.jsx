// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

// frontend/src/App.js
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

// import store from "./store/store";
// import { useAuth } from "./hooks/useAuth";
import { useWeb3 } from "./hooks/useWeb3";

// Components
// import Navbar from "./components/Layout/Navbar";
// import Footer from "./components/Layout/Footer";
// import LoadingSpinner from "./components/Common/LoadingSpinner";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import PatientDashboard from "./pages/Patient/Dashboard";
import ProviderDashboard from "./pages/Provider/Dashboard";
import MedicalRecords from "./pages/Records/MedicalRecords";
import AccessManagement from "./pages/Patient/AccessManagement";
import CreateRecord from "./pages/Provider/CreateRecord";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196F3",
      dark: "#1976D2",
      light: "#BBDEFB",
    },
    secondary: {
      main: "#4CAF50",
      dark: "#388E3C",
      light: "#C8E6C9",
    },
    background: {
      default: "#F5F5F5",
    },
  },
  typography: {
    fontFamily: ["Roboto", "Arial", "sans-serif"].join(","),
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
});

function App() {
  const { isAuthenticated, userType, loading: authLoading } = useAuth();
  const { isWeb3Enabled, loading: web3Loading } = useWeb3();

  if (authLoading || web3Loading) {
    return <LoadingSpinner />;
  }

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div className="App">
            <Navbar />
            <main
              style={{ minHeight: "calc(100vh - 140px)", paddingTop: "80px" }}
            >
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Landing />} />
                <Route
                  path="/login"
                  element={
                    !isAuthenticated ? <Login /> : <Navigate to="/dashboard" />
                  }
                />
                <Route
                  path="/register"
                  element={
                    !isAuthenticated ? (
                      <Register />
                    ) : (
                      <Navigate to="/dashboard" />
                    )
                  }
                />

                {/* Protected Routes */}
                <Route
                  path="/dashboard"
                  element={
                    isAuthenticated ? (
                      userType === "patient" ? (
                        <PatientDashboard />
                      ) : (
                        <ProviderDashboard />
                      )
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />

                <Route
                  path="/records"
                  element={
                    isAuthenticated ? (
                      <MedicalRecords />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />

                <Route
                  path="/access-management"
                  element={
                    isAuthenticated && userType === "patient" ? (
                      <AccessManagement />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />

                <Route
                  path="/create-record"
                  element={
                    isAuthenticated && userType === "provider" ? (
                      <CreateRecord />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />

                {/* Catch all route */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
