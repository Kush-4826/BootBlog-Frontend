import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext"
import NotFound from "../screens/errors/NotFound";

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
    return <NotFound />
  }

  return <Outlet />;
}

export default ProtectedAdminRoutes;