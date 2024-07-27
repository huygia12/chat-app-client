import Gender from "./enums/gender";
import Role from "./enums/role";

interface User {
  userId: string;
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

interface UserDecoded {
  userId: string;
  email: string;
  username: string;
  role: Role;
}

export type { User, UserDecoded };
