import { useContext, useState } from "react";
import UserContext, { UserContextProps } from "@/context/UserContext";
import DarkModeContext, {
  DarkModeContextValue,
} from "@/context/DarkModeContext";

/**
 * A hook so that you can set,get,clear <key, value> in local storage
 *
 * @returns All state values from {@link UserProvider}.
 */
const useLocalStorage = <T>(
  key: string,
  initValue: T
): [T, (value: T) => void, () => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const prevValue = window.localStorage.getItem(key);
      return prevValue ? JSON.parse(prevValue) : initValue;
    } catch {
      console.info(`Storage value for key: ${key} is null`);
      return initValue;
    }
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
      setStoredValue(initValue);
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
const useCurrUser = (): UserContextProps => {
  const { currUser, setCurrUser, clearCurrUser } = useContext(UserContext);

  return { currUser, setCurrUser, clearCurrUser };
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

export { useLocalStorage, useCurrUser, useDarkMode };
