import { useSession } from "@/utils/custom-hook";
import { Context, ReactNode, createContext } from "react";
import { Nullable } from "@/utils/declare";

interface AuthContextProps {
  token: Nullable<string>;
  setToken: (token: string) => void;
  clearToken: () => void;
}

const AuthContext: Context<AuthContextProps> = createContext({
  token: null,
  setToken: () => {},
  clearToken: () => {},
} as AuthContextProps);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken, clearToken] = useSession<string>("access_token");

  return (
    <AuthContext.Provider value={{ token, setToken, clearToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, type AuthContextProps };
export default AuthContext;
