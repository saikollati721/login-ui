import { createContext } from "react";
import { User } from "../shared/models/user.model";

export interface SessionContextType {
  user: User | undefined;
  create: (user: User, callback: VoidFunction) => void;
  destroy: (callback: VoidFunction) => void;
  refreshSession: (callback: VoidFunction) => void;
}

export const SessionContext = createContext<SessionContextType>({
  user: undefined,

  create: (user: User, callback: VoidFunction) => {
    console.log(user, callback);
  },

  destroy: (callback: VoidFunction) => {
    console.log(callback);
  },

  refreshSession: (callback: VoidFunction) => {
    console.log("Refreshing session", callback);
  },
});
