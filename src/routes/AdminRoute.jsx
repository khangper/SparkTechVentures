const AdminRoute = ({ children }) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const userRole = localStorage.getItem("userRole");
  
    return isLoggedIn && userRole === "ADMIN" ? children : <Navigate to="/login" />;
  };
  
  export default AdminRoute;
  