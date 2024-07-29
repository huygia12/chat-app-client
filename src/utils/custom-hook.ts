import { useContext, useState } from "react";
import DarkModeContext, {
  DarkModeContextValue,
} from "@/context/dark-mode-context";
import AuthContext from "@/context/auth-context";
import Role from "@/entities/enums/role";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { UserDecoded } from "@/entities/user";
import { Nullable } from "./declare";

interface TokenDecoded extends JwtPayload {
  userId: number;
  email: string;
  username: string;
  role: Role;
}

/**
 * A hook so that you can set,get,clear <key, value> in local storage
 *
 * @returns All state values from {@link UserProvider}.
 */
const useSession = <T>(key: string): [T, (value: T) => void, () => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const prevValue = window.sessionStorage.getItem(key);
    return prevValue && JSON.parse(prevValue);
  });

  const setToSession = (value: T) => {
    try {
      setStoredValue(value);
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.info(`Session value for key: ${key} is null`);
    }
  };

  const removeFromSession = () => {
    try {
      window.sessionStorage.removeItem(key);
    } catch (error) {
      console.info(`Session value for key: ${key} is null`);
    }
  };

  return [storedValue, setToSession, removeFromSession];
};

/**
 * A hook so that you can set,get,clear <key, value> in local storage
 *
 * @returns All state values and value modifiers.
 */
const useLocalStorage = <T>(
  key: string,
  initValue: T
): [T, (value: T) => void, () => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const prevValue = window.localStorage.getItem(key);

    if (!prevValue) return initValue;
    return prevValue && JSON.parse(prevValue);
  });

  const setToLocal = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.info(`Storage value for key: ${key} is null`);
    }
  };

  const removeFromLocal = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.info(`Storage value for key: ${key} is null`);
    }
  };

  return [storedValue, setToLocal, removeFromLocal];
};

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
    newToken: Nullable<string> = accessToken
  ): Nullable<UserDecoded> => {
    try {
      if (!newToken) return null;

      const tokenDecoded = jwtDecode<TokenDecoded>(newToken);
      if (!tokenDecoded.sub) return null;

      const userDecoded: UserDecoded = {
        userId: tokenDecoded.sub,
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

/**
 * A hook so that you don't have to call `useContext(DarkModeContext)` all the
 * time.
 * @returns All state values from {@link DarkModeProvider}.
 * @throw Error if you use outside `DarkModeProvider`.
 */
const useDarkMode = (): DarkModeContextValue => {
  const context = useContext(DarkModeContext);

  if (!context) {
    throw new Error("DarkModeContext was used outside of DarkModeProvider");
  }

  return context;
};

export { useLocalStorage, useSession, useAuth, useDarkMode };
