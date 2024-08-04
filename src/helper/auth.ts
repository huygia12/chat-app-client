import { AuthUser } from "@/types/api";
import { Nullable } from "@/utils/declare";
import { jwtDecode } from "jwt-decode";

const TOKEN_NAME: string = "access_token";

const auth = {
  token: {
    name: TOKEN_NAME,
    getAccessToken: () => window.sessionStorage.getItem(TOKEN_NAME),
    setAccessToken: (token: string) =>
      window.sessionStorage.setItem(TOKEN_NAME, token),
    removeAccessToken: () => window.sessionStorage.removeItem(TOKEN_NAME),
  },
  getUser: function (): Nullable<AuthUser> {
    try {
      const rawToken: Nullable<string> =
        window.sessionStorage.getItem("access_token");
      if (!rawToken) return null;

      const tokenDecoded = jwtDecode<AuthUser>(rawToken);
      if (!tokenDecoded.sub) return null;

      const userDecoded: AuthUser = {
        userId: tokenDecoded.sub,
        username: tokenDecoded.username,
        role: tokenDecoded.role,
        email: tokenDecoded.email,
        sub: tokenDecoded.sub,
        exp: tokenDecoded.exp,
      };

      return userDecoded;
    } catch {
      console.debug("Invalid token!");
      return null;
    }
  },
};

export default auth;
