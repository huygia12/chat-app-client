import { Nullable } from "@/utils/declare";
import { reqConfig } from "@/utils/axios-config";
import axios, { AxiosResponse } from "axios";
import { LoginFormProps } from "@/schema/login-form-schema";

const refreshToken = async (): Promise<Nullable<string>> => {
  try {
    const res = await axios.get<{ access_token: string }>(
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
  const res = await axios.post<{ access_token: string }>(
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

const logout = async (): Promise<AxiosResponse> => {
  const res = await axios.get(
    `${import.meta.env.VITE_AUTHEN_URL}/logout`,
    reqConfig
  );

  return res;
};

export { refreshToken, login, logout };
