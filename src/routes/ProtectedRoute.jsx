import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/calsciuser" replace />;

  return children;
};

export default ProtectedRoute;
