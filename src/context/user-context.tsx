import { UserDecoded } from "@/entities/user";
import { useSession } from "@/utils/custom-hook";
import { Context, ReactNode, createContext } from "react";
import { Nullable } from "@/utils/declare";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jwt-decode";
import Role from "@/entities/enums/role";

interface UserDecodedContextProps {
  getUserDecoded: () => Nullable<UserDecoded>;
  setToken: (token: string) => void;
  clearToken: () => void;
}

interface TokenDecoded extends JwtPayload {
  userId: number;
  email: string;
  username: string;
  role: Role;
}

const UserDecodedContext: Context<UserDecodedContextProps> = createContext({
  getUserDecoded: () => null,
  setToken: () => {},
  clearToken: () => {},
} as UserDecodedContextProps);

const UserDecodedProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken, clearToken] = useSession<string>("access_token");

  const getUserDecoded = (): UserDecoded | null => {
    try {
      console.debug("token: ", token);
      const tokenDecoded: TokenDecoded = jwtDecode<TokenDecoded>(token);

      if (!tokenDecoded.sub) return null;

      const userDecoded: UserDecoded = {
        userId: tokenDecoded.sub,
        username: tokenDecoded.username,
        role: tokenDecoded.role,
        email: tokenDecoded.email,
      };
      return userDecoded;
    } catch {
      console.info("Invalid token");
      return null;
    }
  };

  return (
    <UserDecodedContext.Provider
      value={{ getUserDecoded, setToken, clearToken }}
    >
      {children}
    </UserDecodedContext.Provider>
  );
};

export { UserDecodedProvider, type UserDecodedContextProps };
export default UserDecodedContext;
