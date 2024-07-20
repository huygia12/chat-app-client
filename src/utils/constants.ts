import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "yinline-flex yitems-center yjustify-center ywhitespace-nowrap yrounded-md ytext-sm yfont-medium yring-offset-background ytransition-colors focus-visible:youtline-none focus-visible:yring-2 focus-visible:yring-ring focus-visible:yring-offset-2 disabled:ypointer-events-none disabled:yopacity-50",
  {
    variants: {
      variant: {
        default:
          "items-center rounded-lg bg-primary-light py-2.5 text-center text-white transition-colors hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-effect-light dark:bg-primary-dark dark:hover:bg-cyan-700 dark:focus:ring-cyan-800",
        destructive:
          "ybg-destructive ytext-destructive-foreground hover:ybg-destructive/90",
        outline:
          "yborder yborder-input ybg-background hover:ybg-accent hover:ytext-accent-foreground",
        secondary:
          "ybg-secondary ytext-secondary-foreground hover:ybg-secondary/80",
        ghost: "hover:ybg-accent hover:ytext-accent-foreground",
        link: "ytext-primary yunderline-offset-4 hover:yunderline",
      },
      size: {
        default: "yh-10 ypx-4 ypy-2",
        sm: "yh-9 yrounded-md ypx-3",
        lg: "yh-11 yrounded-md ypx-8",
        icon: "yh-10 yw-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export { buttonVariants };
