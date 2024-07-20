import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  className?: string;
}

const IconButton: FC<IconButtonProps> = ({
  className,
  ...props
}: IconButtonProps): JSX.Element => {
  const base =
    "text-primary-light border-primary-light hover:bg-primary-light focus:ring-effect-light dark:border-cyan-500 dark:text-primary-dark dark:focus:ring-effect-dark dark:hover:bg-primary-dark me-2 inline-flex items-center rounded-lg p-2.5 text-center text-sm font-medium hover:text-white focus:outline-none focus:ring-4 dark:hover:text-white";

  return (
    <button type="button" {...props} className={twMerge(base, className)}>
      {props.icon}
    </button>
  );
};

export default IconButton;
