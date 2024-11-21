import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, user, children }) => {
  const location = useLocation();
  if (location.pathname === "/") {
    if (!isAuthenticated) {
      return <Navigate to="/auth/register" />;
    } else {
        return <Navigate to="/dashboard/home" />;
      }
    }

  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    
      return <Navigate to="/dashboard/home" />;
  }
  return <>{children}</>
}


export default ProtectedRoute;
