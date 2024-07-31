import { useState } from "react";

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

export default useSession;
