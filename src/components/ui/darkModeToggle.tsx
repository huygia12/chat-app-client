import { useDarkMode } from "@/utils/customHook";
import IconButton from "./iconButton";
import { MoonIcon, SunIcon } from "lucide-react";

const DarkModeToggle = (): JSX.Element => {
  const context = useDarkMode();
  const icon = context?.isDarkMode ? <MoonIcon /> : <SunIcon />;

  return (
    <IconButton
      icon={icon}
      onClick={context?.toggleMode}
      className="shadow-general absolute top-4 left-4 transition-colors hover:border-yellow-500 hover:bg-yellow-500 focus:ring-0 focus:ring-offset-0"
    />
  );
};

export default DarkModeToggle;
