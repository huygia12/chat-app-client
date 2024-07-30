import { Nullable } from "@/utils/declare";
import { axiosInstance, reqConfig } from "@/utils/axios-config";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { LoginFormProps } from "@/schema/login-form-schema";

const refreshToken = async (
  instance: AxiosInstance = axiosInstance
): Promise<Nullable<string>> => {
  try {
    const res = await instance.get<{ access_token: string }>(
      `${import.meta.env.VITE_AUTHEN_URL}/refresh`,
      reqConfig
    );

    console.debug("AUTH APIS: refresh response: ", JSON.stringify(res));

    return res.data.access_token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Error response: ${error.response}`);
    } else {
      console.error("Unexpected error:", error);
    }
    return null;
  }
};

const login = async (
  data: LoginFormProps
): Promise<
  AxiosResponse<{
    access_token: string;
  }>
> => {
  const res = await axiosInstance.post<{ access_token: string }>(
    `${import.meta.env.VITE_AUTHEN_URL}/login`,
    {
      payload: {
        user: {
          email: data.email.trim(),
          password: data.password.trim(),
        },
      },
    },
    reqConfig
  );

  return res;
};

export { refreshToken, login };
