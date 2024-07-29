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
  links: MainNavItem[];
}

const Nav: FC<NavProps> = ({ ...props }) => {
  return (
    <div data-collapsed={props.isCollapsed} className="group p-2">
      <nav className="flex flex-col gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {props.links.map((link, index) =>
          props.isCollapsed ? (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <NavLink
                  to={link.url}
                  className={cn(
                    buttonVariants({ variant: link.variant }),
                    // link.variant === "primary" &&
                    //   "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
                    "py-6"
                  )}
                >
                  <span>
                    <link.icon size={24} />
                  </span>
                  <span className="sr-only">{link.title}</span>
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {link.title}
                {link.label && (
                  <span className="ml-auto text-muted-foreground">
                    {link.label}
                  </span>
                )}
              </TooltipContent>
            </Tooltip>
          ) : (
            <NavLink
              key={index}
              to={link.url}
              className={cn(
                buttonVariants({ variant: link.variant }),
                "flex p-4 items-center text-h3 font-normal justify-start",
                link.variant === "primary" &&
                  "text-white dark:bg-muted dark:hover:bg-muted dark:hover:text-white"
              )}
            >
              <span className="mr-2">
                <link.icon size={24} />
              </span>
              <span className="overflow-hidden text-ellipsis mr-4">
                {link.title}
              </span>
              {link.label && (
                <span
                  className={cn(
                    "ml-auto"
                    // link.variant === "primary" &&
                    //   "text-background dark:text-white"
                  )}
                >
                  {link.label}
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
