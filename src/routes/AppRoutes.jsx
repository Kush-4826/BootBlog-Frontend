import { Route, Routes } from "react-router";
import { useAuth } from "../context/AuthContext";
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import ProtectedRoute from "../components/ProtectedRoute";
import NotFound from "../screens/errors/NotFound";
import ProtectedAdminRoutes from "../components/ProtectedAdminRoutes";
import Dashboard from "../admin/screens/Dashboard";

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />
      <Route path="/404" element={<NotFound />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route element={<ProtectedAdminRoutes />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Route>

    </Routes>
  );
}

export default AppRoutes;