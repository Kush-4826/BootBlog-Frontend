import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext"

const ProtectedAdminRoutes = () => {
  const {isAuthenticated, isAdmin, loading} = useAuth();
  const location = useLocation();

  if(loading){
    return <div>Loading...</div>;
  }

  if(!isAuthenticated){
    return <Navigate to="/login" state={{from: location}} replace />
  }

  if(!isAdmin){
    return <Navigate to="/404" replace />
  }

  return <Outlet />;
}

export default ProtectedAdminRoutes;