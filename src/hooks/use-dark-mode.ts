import DarkModeContext, {
  DarkModeContextValue,
} from "@/context/dark-mode-context";
import { useContext } from "react";

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

export default useDarkMode;
