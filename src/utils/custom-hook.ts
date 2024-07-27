import { useContext, useState } from "react";
import UserDecodedContext, {
  UserDecodedContextProps,
} from "@/context/user-context";
import DarkModeContext, {
  DarkModeContextValue,
} from "@/context/dark-mode-context";

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
  key: string
): [T, (value: T) => void, () => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const prevValue = window.localStorage.getItem(key);
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
 * A hook so that you don't have to call `useContext(UserContext)` all the
 * time.
 * @returns All state values from {@link UserProvider}.
 */
const useCurrUser = (): UserDecodedContextProps => {
  const { getUserDecoded, setToken, clearToken } =
    useContext(UserDecodedContext);

  return { getUserDecoded, setToken, clearToken };
};

/**
 * A hook so that you don't have to call `useContext(DarkModeContext)` all the
 * time.
 * @returns All state values from {@link DarkModeProvider}.
 * @throw Error if you use outside `DarkModeProvider`.
 */
const useDarkMode = (): DarkModeContextValue => {
  const context = useContext(DarkModeContext);

  if (context === undefined || context === null) {
    throw new Error("DarkModeContext was used outside of DarkModeProvider");
  }

  return context;
};

export { useLocalStorage, useSession, useCurrUser, useDarkMode };
