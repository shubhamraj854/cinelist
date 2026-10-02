import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

// Wrap a page in this to require login. Not logged in = redirect, and remember where they wanted to go.
export default function ProtectedRoute({ children }) {
  const user = useSelector((s) => s.auth.user);
  const location = useLocation();
  return user ? children : <Navigate to="/login" state={{ from: location.pathname }} replace />;
}
