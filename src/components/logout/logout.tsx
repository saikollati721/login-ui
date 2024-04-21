import { SessionContext } from "../../contexts/session-context";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/user-service";
import { toastify } from "../common/toast/toast";

const Logout: React.FC = () => {
  const auth = useContext(SessionContext);
  const navigate = useNavigate();

  useEffect(() => {
    UserService.remove().then(() => {
        auth.destroy(() => {
          toastify("User Logged out Succcessfully...!", {type :'default'})
          navigate('/');
        });
      }
    )
  }, []);
  return <><h1>Loging Out</h1></>;
};

export default Logout;
