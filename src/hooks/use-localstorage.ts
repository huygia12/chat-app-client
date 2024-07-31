import { useState } from "react";

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

export default useLocalStorage;
