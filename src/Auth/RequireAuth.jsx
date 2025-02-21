import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ allowedRoles, children }) => {
  const location = useLocation();

  const accessToken = localStorage.getItem("accessToken");
  const userRole = localStorage.getItem("role");

  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children; 
};

export default RequireAuth;
