import { useLocalStorage } from "@/hooks";
import { Nullable } from "@/utils/declare";
import { Context, ReactNode, createContext, useEffect } from "react";

interface DarkModeContextValue {
  isDarkMode: boolean;
  toggleMode: () => void;
}

const DarkModeContext: Context<Nullable<DarkModeContextValue>> = createContext(
  null as Nullable<DarkModeContextValue>
);

/**
 * Provider for dark mode feature.
 */
const DarkModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkMode, setDarkMode] = useLocalStorage(
    "isDarkMode",
    window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect((): void => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  function toggleMode(): void {
    setDarkMode(!isDarkMode);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export { DarkModeProvider, type DarkModeContextValue };
export default DarkModeContext;
