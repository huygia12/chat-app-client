import AuthContext from "@/context/auth-context";
import Role from "@/types/enums/role";
import { UserDecoded } from "@/types/api";
import { Nullable } from "@/utils/declare";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useContext } from "react";

interface TokenDecoded extends JwtPayload {
  userId: number;
  email: string;
  username: string;
  role: Role;
}

/**
 * A hook so that you don't have to call `useContext(AuthContext)` all the
 * time.
 * @returns All state values and value modifiers from {@link AuthProvider}.
 */
const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { accessToken, setAccessToken, clearAccessToken } = authContext;

  const getUserDecoded = (
    newToken: Nullable<string> = window.sessionStorage.getItem("access_token")
  ): Nullable<UserDecoded> => {
    try {
      if (!newToken) return null;

      const tokenDecoded = jwtDecode<TokenDecoded>(newToken);
      if (!tokenDecoded.sub) return null;

      const userDecoded: UserDecoded = {
        userId: BigInt(tokenDecoded.sub),
        username: tokenDecoded.username,
        role: tokenDecoded.role,
        email: tokenDecoded.email,
      };

      return userDecoded;
    } catch {
      console.debug("Invalid token!");
      return null;
    }
  };
  return { getUserDecoded, accessToken, setAccessToken, clearAccessToken };
};

export default useAuth;
