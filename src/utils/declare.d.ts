import { LucideIcon } from "lucide-react";

type Nullable<T> = T | undefined | null;

interface Message {
  message: string;
  room: string;
}

interface ServerToClientEvents {
  serverMsg: (data: Message) => void;
}

interface ClientToServerEvents {
  clientMsg: (data: Message) => void;
}

interface MainNavItem {
  title: string;
  label?: string;
  url: string;
  icon: LucideIcon;
  action?: (...agrs) => void | Promise<void>;
}

export type {
  Nullable,
  Message,
  ClientToServerEvents,
  ServerToClientEvents,
  MainNavItem,
};
