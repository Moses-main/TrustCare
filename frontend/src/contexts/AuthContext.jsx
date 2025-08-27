import React, { createContext, useContext, useState, useEffect } from "react";
// Import real API by default
import { authAPI as realAuthAPI } from "../services/api";
import { mockAuthAPI } from "../services/mockApi";

// Use mock API in development
const isDevelopment = import.meta.env.MODE === "development";
const authAPI = isDevelopment ? mockAuthAPI : realAuthAPI;
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuth = async () => {
      console.log("Checking authentication status...");
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token found, user is not authenticated");
        setLoading(false);
        return;
      }

      try {
        console.log("Token found, validating with server...");
        const response = await authAPI.getMe();
        console.log("Auth response:", response);

        if (response?.data) {
          console.log("User authenticated:", response.data);
          setUser(response.data);
        } else {
          throw new Error("Invalid response from server");
        }
      } catch (err) {
        console.error("Authentication check failed:", err);
        setUser(null);
        localStorage.removeItem("token");

        // Only show toast on initial load if there was a token
        if (token) {
          toast.error("Session expired. Please log in again", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } finally {
        setLoading(false);
      }
    };

    // Add a small delay to prevent race conditions
    const timer = setTimeout(() => {
      checkAuth().catch(console.error);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      console.log("Attempting login with:", credentials);
      const response = await authAPI.login(credentials);
      console.log("Login response:", response);

      const { token, user } = response.data;
      console.log("Setting token and user:", { token, user });

      localStorage.setItem("token", token);
      setUser(user);
      setLoading(false);
      toast.success("Login successful!");

      // Return the user data for the component to use
      return user;
    } catch (err) {
      console.error("Login error:", err);
      const msg = err.response?.data?.message || err.message || "Login failed";
      setError(msg);
      setLoading(false);
      toast.error(msg);
      throw err;
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authAPI.register(userData);
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      setUser(user);
      setLoading(false);
      toast.success("Registration successful!");
      return user;
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed";
      setError(msg);
      setLoading(false);
      toast.error(msg);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.info("You have been logged out.");
    navigate("/login");
  };

  const updateUser = (updatedUser) => {
    setUser((prev) => ({
      ...prev,
      ...updatedUser,
    }));
  };

  const value = React.useMemo(
    () => ({
      user,
      loading,
      error,
      isAuthenticated: !!user,
      isPatient: user?.role === "patient",
      isProvider: ["doctor", "nurse", "staff"].includes(user?.role),
      isAdmin: user?.role === "admin",
      login,
      register,
      logout,
      updateUser,
    }),
    [user, loading, error]
  );

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
