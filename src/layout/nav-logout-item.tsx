import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { buttonVariants } from "@/utils/constants";
import { FC, HTMLAttributes } from "react";
import { useAuth } from "@/hooks";
import { LogOut } from "lucide-react";

interface BottomNavProps extends HTMLAttributes<HTMLDivElement> {
  isCollapsed: boolean;
  selectedUrl: string;
  setSelectedUrl: (navItem: string) => void;
}

const NavLogoutItem: FC<BottomNavProps> = ({ className, ...props }) => {
  const { logout } = useAuth();

  return (
    <div
      data-collapsed={props.isCollapsed}
      className={cn("group p-2", className)}
    >
      <nav className="flex flex-col gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {props.isCollapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <span
                onClick={async () => {
                  await logout();
                }}
                className={cn(
                  buttonVariants({
                    variant:
                      props.selectedUrl === "logout" ? "primary" : "ghost",
                  }),
                  // link.variant === "primary" &&
                  //   "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
                  "py-6 cursor-pointer"
                )}
              >
                <span>
                  <LogOut size={24} />
                </span>
                <span className="sr-only">Logout</span>
              </span>
            </TooltipTrigger>
            <TooltipContent side="right" className="flex items-center gap-4">
              Logout
            </TooltipContent>
          </Tooltip>
        ) : (
          <span
            onClick={async () => {
              await logout();
            }}
            className={cn(
              buttonVariants({
                variant: "logout" === props.selectedUrl ? "primary" : "ghost",
              }),
              "flex p-4 items-center text-h3 font-normal justify-start cursor-pointer"
              // item.variant === "primary" &&
              //   "text-white dark:bg-muted dark:hover:bg-muted dark:hover:text-white"
            )}
          >
            <span className="mr-2">
              <LogOut size={24} />
            </span>
            <span className="overflow-hidden text-ellipsis mr-4">Logout</span>
          </span>
        )}
      </nav>
    </div>
  );
};

export default NavLogoutItem;
