import { LucideIcon } from "lucide-react";

interface MainNavItem {
  title: string;
  label?: string;
  url?: string;
  icon: LucideIcon;
  action?: (...params: unknown[]) => void | Promise<void>;
}

export type { MainNavItem };
