import { Gender, Role } from "./enums";

interface User {
  userId: bigint;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  birthday: Date;
  gender: Gender;
  role: Role;
  phoneNumber: string;
  privacy: string;
  isActive: string;
  avatarLocation: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export type { User };
