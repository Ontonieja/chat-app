import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  console.log(loading);
  const isAuthenticated = !!user;
  if (!loading)
    return isAuthenticated ? <>{children}</> : <Navigate to="/auth" />;
};

export const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const isAuthenticated = !!user;

  if (!loading)
    return isAuthenticated ? <Navigate to="/chat" /> : <>{children}</>;
};
