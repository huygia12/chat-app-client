import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "yinline-flex yitems-center yjustify-center ywhitespace-nowrap yrounded-md ytext-sm yfont-medium yring-offset-background ytransition-colors focus-visible_youtline-none focus-visible_yring-2 focus-visible_yring-ring focus-visible_yring-offset-2 disabled_ypointer-events-none disabled_yopacity-50",
  {
    variants: {
      variant: {
        default: "ybg-primary ytext-primary-foreground hover_ybg-primary/90",
        destructive:
          "ybg-destructive ytext-destructive-foreground hover_ybg-destructive/90",
        outline:
          "yborder yborder-input ybg-background hover_ybg-accent hover_ytext-accent-foreground",
        secondary:
          "ybg-secondary ytext-secondary-foreground hover_ybg-secondary/80",
        ghost: "hover_ybg-accent hover_ytext-accent-foreground",
        link: "ytext-primary yunderline-offset-4 hover_yunderline",
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
