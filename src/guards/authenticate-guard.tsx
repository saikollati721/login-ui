import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { SessionContext } from "../contexts/session-context";

export default function AuthenticatedGuard() {
  const auth = useContext(SessionContext);
  
  if (!auth.user) {
    console.warn("Auth session is missing, so redirecting to home");
    return (
      <Navigate
        to={`/`}
        replace
      />
    );
  }

  return <Outlet />;
}
