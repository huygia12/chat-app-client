import { useSession } from "@/utils/custom-hook";
import { ReactNode, createContext, useEffect, useRef } from "react";
import { Nullable } from "@/utils/declare";
import { refreshToken } from "@/apis/auth";

interface AuthContextProps {
  accessToken: Nullable<string>;
  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken, clearAccessToken] =
    useSession<string>("access_token");
  const hasFetched = useRef(false);

  useEffect(() => {
    const initializeAuth = async () => {
      const newAccessToken: Nullable<string> = await refreshToken();
      console.debug("AUTH CONTEXT: new access token:", newAccessToken);

      if (newAccessToken) {
        setAccessToken(newAccessToken);
      }
    };

    if (!hasFetched.current) initializeAuth();
    hasFetched.current = true;
  }, []);

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, clearAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, type AuthContextProps };
export default AuthContext;
