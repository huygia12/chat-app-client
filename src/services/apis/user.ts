import { formatDate } from "date-fns";
import { SignupFormProps } from "@/schema";
import axios from "axios";

const signup = async (
  data: SignupFormProps,
  birthDay: Date,
  selectedAvatarIndex: number
) => {
  const response = await axios.post(`${import.meta.env.VITE_USER_URL}/signup`, {
    username: data.userName.trim(),
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    email: data.email.trim(),
    phoneNumber: data.phoneNumber.trim(),
    password: data.password.trim(),
    birthday: formatDate(birthDay, "yyyy-MM-dd"),
    gender: data.gender.trim(),
    avatarUrl: `/avt-template/avt${selectedAvatarIndex + 1}.png`,
  });

  return response;
};

export default { signup };
