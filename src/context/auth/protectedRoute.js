// src/features/auth/ProtectedRoute.jsx

import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();

  // fallback to localStorage token if context is not initialized yet
  const loggedIn = isLoggedIn || !!localStorage.getItem("token");

  return loggedIn ? children : <Navigate to="/signin" replace />;
}
