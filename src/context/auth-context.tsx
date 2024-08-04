import { ReactNode, createContext, useLayoutEffect, useState } from "react";
import { Nullable, Optional } from "@/utils/declare";
import useCustomNavigate from "@/hooks/use-custom-navigate";
import { LoginFormProps } from "@/schema";
import { AxiosResponse, HttpStatusCode } from "axios";
import { authService } from "@/services/apis";
import { Role } from "@/utils/enums";
import { AuthUser } from "@/types/api";
import auth from "@/helper/auth";

interface AuthContextProps {
  login: (data: LoginFormProps, goBack?: boolean) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);
const blackList: string[] = ["/login", "/signup"];
const adminRoutes: string = "/admin";

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { navigate, location } = useCustomNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    const checkPermisionToAdmminRoute = (): boolean => {
      //Prevent normal user fromm accessing /admin
      const userDecoded: Nullable<AuthUser> = auth.getUser();
      console.debug("AUTH CONTEXT : check role");
      if (!userDecoded) {
        !blackList.includes(location.pathname) && navigate("login");
        return false;
      }

      if (
        location.pathname.includes(adminRoutes) &&
        userDecoded.role !== Role.ADMIN
      ) {
        navigate("/unauthorized");
        return false;
      }

      return true;
    };

    const preventFromBlackListAfterLogin = (): boolean => {
      //Prevent user from routes in blacklist
      const accessToken: Nullable<string> = auth.token.getAccessToken();
      console.debug("AUTH CONTEXT : check blacklist");

      if (accessToken && blackList.includes(location.pathname)) {
        navigate("/messages");
        return false;
      }

      return true;
    };

    const checkAccessToken = async (): Promise<boolean> => {
      const accessToken: Nullable<string> = auth.token.getAccessToken();
      console.debug("AUTH CONTEXT : check auth");

      if (!accessToken && !blackList.includes(location.pathname)) {
        const newAccessToken: Nullable<string> =
          await authService.refreshToken();
        if (!newAccessToken) {
          navigate("login");
          return false;
        }
        auth.token.setAccessToken(newAccessToken);
      }

      return true;
    };

    const runMiddleware = async () => {
      (await checkAccessToken()) &&
        preventFromBlackListAfterLogin() &&
        checkPermisionToAdmminRoute();
      console.debug("AUTH CONTEXT : check Middleware succeed");
      setIsLoading(false);
    };

    runMiddleware();
  }, [location.pathname]);

  const login = async (data: LoginFormProps, goBack: boolean = true) => {
    const from: Optional<string> = location.state?.from;

    console.debug("FROM: ", JSON.stringify(from));
    const res = await authService.login(data);
    auth.token.setAccessToken(res.data.access_token);

    const userDecoded: Nullable<AuthUser> = auth.getUser();
    if (!userDecoded) throw new Error(`UserDecoded is ${userDecoded}`);

    navigate(
      goBack && from
        ? from
        : userDecoded.role === Role.ADMIN
          ? "/admin"
          : "/messages"
    );
  };

  const logout = async () => {
    const res: AxiosResponse = await authService.logout();
    if (res.status === HttpStatusCode.Ok) {
      window.sessionStorage.clear();
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider value={{ login, logout }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, type AuthContextProps };
export default AuthContext;
