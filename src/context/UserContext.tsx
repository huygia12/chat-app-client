import { User } from "@/entities/user";
import { useLocalStorage } from "@/utils/customHook";
import { Context, ReactNode, createContext } from "react";
import { Nullable } from "@/utils/declare";

interface UserContextProps {
  currUser: Nullable<User>;
  setCurrUser: (user: Nullable<User>) => void;
  clearCurrUser: () => void;
}

const UserContext: Context<UserContextProps> = createContext({
  currUser: undefined,
  setCurrUser: () => {},
  clearCurrUser: () => {},
} as UserContextProps);

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currUser, setCurrUser, clearCurrUser] = useLocalStorage<
    Nullable<User>
  >("user", undefined);

  return (
    <UserContext.Provider value={{ currUser, setCurrUser, clearCurrUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, type UserContextProps };
export default UserContext;
