import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NavLink } from "react-router-dom";
import { buttonVariants } from "@/utils/constants";
import { FC, HTMLAttributes } from "react";
import { MainNavItem } from "@/utils/declare";

interface NavProps extends HTMLAttributes<HTMLDivElement> {
  isCollapsed: boolean;
  selectedUrl: string;
  setSelectedItem: (navItem: string) => void;
  navItems: MainNavItem[];
}

const Nav: FC<NavProps> = ({ className, ...props }) => {
  return (
    <div
      data-collapsed={props.isCollapsed}
      className={cn("group p-2", className)}
    >
      <nav className="flex flex-col gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {props.navItems.map((item, index) =>
          props.isCollapsed ? (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <NavLink
                  to={item.url ?? "#"}
                  onClick={async () => {
                    item.action && (await item.action());
                    props.setSelectedItem(item.title);
                  }}
                  className={cn(
                    buttonVariants({
                      variant:
                        item.url === props.selectedUrl ? "primary" : "ghost",
                    }),
                    // link.variant === "primary" &&
                    //   "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
                    "py-6"
                  )}
                >
                  <span>
                    <item.icon size={24} />
                  </span>
                  <span className="sr-only">{item.title}</span>
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {item.title}
                {item.label && (
                  <span className="ml-auto text-muted-foreground">
                    {item.label}
                  </span>
                )}
              </TooltipContent>
            </Tooltip>
          ) : (
            <NavLink
              key={index}
              to={item.url ?? "#"}
              onClick={async () => {
                item.action && (await item.action());
                props.setSelectedItem(item.title);
              }}
              className={cn(
                buttonVariants({
                  variant: item.url === props.selectedUrl ? "primary" : "ghost",
                }),
                "flex p-4 items-center text-h3 font-normal justify-start"
                // item.variant === "primary" &&
                //   "text-white dark:bg-muted dark:hover:bg-muted dark:hover:text-white"
              )}
            >
              <span className="mr-2">
                <item.icon size={24} />
              </span>
              <span className="overflow-hidden text-ellipsis mr-4">
                {item.title}
              </span>
              {item.label && (
                <span
                  className={cn(
                    "ml-auto"
                    // link.variant === "primary" &&
                    //   "text-background dark:text-white"
                  )}
                >
                  {item.label}
                </span>
              )}
            </NavLink>
          )
        )}
      </nav>
    </div>
  );
};

export default Nav;
