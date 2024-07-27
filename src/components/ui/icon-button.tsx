import { LucideIcon } from "lucide-react";
import { ButtonHTMLAttributes, FC, LegacyRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  className?: string;
  ref?: LegacyRef<HTMLButtonElement>;
}

const IconButton: FC<IconButtonProps> = forwardRef(
  ({ className, ...props }, ref) => {
    const base =
      "text-primary-light border-primary-light hover:bg-primary-light focus:ring-effect-light dark:border-cyan-500 dark:text-primary-dark dark:focus:ring-effect-dark dark:hover:bg-primary-dark me-2 inline-flex items-center rounded-lg p-2.5 text-center text-sm font-medium hover:text-white focus:outline-none focus:ring-4 dark:hover:text-white";

    return (
      <button
        type="button"
        {...props}
        ref={ref}
        className={twMerge(base, className)}
      >
        <props.icon />
      </button>
    );
  }
);

export default IconButton;
