import { Role } from "@/utils/enums";

interface AuthUser {
  sub: bigint;
  exp: string;
  userId: bigint;
  email: string;
  username: string;
  role: Role;
}

export type { AuthUser };
