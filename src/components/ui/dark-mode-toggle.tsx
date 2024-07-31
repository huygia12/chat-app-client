import IconButton from "./icon-button";
import { LucideIcon, MoonIcon, SunIcon } from "lucide-react";
import Draggable from "react-draggable";
import { FC, HTMLAttributes, useRef } from "react";
import { useDarkMode } from "@/hooks";

const DarkModeToggle: FC<HTMLAttributes<HTMLButtonElement>> = () => {
  const context = useDarkMode();
  const icon: LucideIcon = context?.isDarkMode ? MoonIcon : SunIcon;
  const draggableRef = useRef(null);

  return (
    <Draggable bounds="parent" nodeRef={draggableRef}>
      <IconButton
        ref={draggableRef}
        icon={icon}
        onDoubleClick={context?.toggleMode}
        className="z-50 m-2 shadow-general absolute top-4 left-4 transition-colors hover:border-yellow-500 hover:bg-yellow-500 focus:ring-0 focus:ring-offset-0"
      />
    </Draggable>
  );
};

export default DarkModeToggle;
