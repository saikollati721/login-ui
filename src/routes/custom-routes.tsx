import {
  BrowserRouter,
  Routes as BrowserRoutes,
  Route,
} from "react-router-dom";
import Home from "../components/dashboard/home";
import LoginComponent from "../components/login/login";
import Logout from "../components/logout/logout";
import AuthenticatedGuard from "../guards/authenticate-guard";
import UnAuthenticatedGuard from "../guards/unauthenticate-guard";
import { SessionContext } from "../contexts/session-context";
import { useContext } from "react";
import { UserAdditionForm } from "components/admin/user-addition-form";


const publicAccessRoute = [
  '/ui/login',
  '/ui/under_maintenance', 
  '/ui/'
];

const checkIfUrlIsWhitelisted = (url: string) => {
  return publicAccessRoute.includes(url);
};

const isWhitelisted = checkIfUrlIsWhitelisted(window.location.pathname);

function CustomRoutes() {

  const auth = useContext(SessionContext);

  return (
        <>
          <BrowserRouter basename="/ui">
            <BrowserRoutes>
              <Route element={ <UnAuthenticatedGuard />}>
                  <Route path={"/"} element={<><Home /></>} />
                  <Route path={"/login"} element={<LoginComponent />} />
                  <Route path={"/signup"} element={<UserAdditionForm />} />

              </Route> 
              <Route element={<AuthenticatedGuard />}>
                    <Route path={"/dashboard"} element={<><Home /></>} />
                    { auth.user && <Route path={"/logout"} element={<Logout />} /> }
              </Route> 
            </BrowserRoutes>
          </BrowserRouter>
        </>
  );
}
export default CustomRoutes;
