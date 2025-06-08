import { Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/AuthContext";

type protectedRouteProps = {
  isAuthenticated: boolean;
};

const ProtectedRoute = ({ isAuthenticated }: protectedRouteProps) => {
  // const { user, loading } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
