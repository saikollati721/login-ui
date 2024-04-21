import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { SessionContext } from "../contexts/session-context";

export default function UnAuthenticatedGuard() {
  const auth = useContext(SessionContext);

  if (auth.user) {
    console.warn("Auth session having user, so redirecting to dashboard");
    return <Navigate to={"/dashboard"} replace/>;
  }
  
  return <Outlet />;
}
