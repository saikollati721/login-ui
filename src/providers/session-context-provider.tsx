import { useEffect, useState } from "react";
import { User } from "../shared/models/user.model";
import UserService from "../services/user-service";
import { SessionContext, SessionContextType } from "../contexts/session-context";

export default function SessionContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User>();
  const [isSessionLoading, setIsSessionLoading] = useState<boolean>(false);

  

  const create = (userValue: User, callback: VoidFunction) => {
    console.log("Confirmting create session");
    setUser(userValue);
    callback();
  };

  const destroy = (callback: VoidFunction) => {
    setUser(undefined);
    callback();
  };

  const fetchUser = (callback: VoidFunction) => {
    setIsSessionLoading(false);
    if(user){
      console.log("User found...!")
      return;
    } else {
      console.log("User Not found...!")
      UserService.show().then(
        (res) => {
          if (res instanceof User) {
              setUser(res);
              callback();
          } else {
            window.location.href = `${process.env.SERVICE_URL}logout?redirectTo=${window.location.href}`;
          }
        },
        (res) => {
          if (res?.response?.status === 503)
            window.location.href = `${window.location.origin}/ui/under_maintenance`;
          else
            window.location.href = `${process.env.SERVICE_URL}logout?redirectTo=${window.location.href}`;
        }
      );
    }
  };

  const refreshSession = (callback: VoidFunction) => {
    console.log("Confirmting refresh session");
    fetchUser(callback);
  };

  useEffect(() => {
    if(document.cookie.includes("X-AUTH")){
      fetchUser(() => {});
    }
  }, []);

  useEffect(() => {
    console.log("User set to :", user);
  }, [user]);

  return (
    <>
      {(
        <SessionContext.Provider
          value={
            {
              user,
              create,
              destroy,
              refreshSession
            } as SessionContextType
          }
        >
          {children}
        </SessionContext.Provider>
      )}
    </>
  );
}
