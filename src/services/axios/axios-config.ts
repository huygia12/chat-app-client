import { refreshToken } from "@/services/apis/auth";
import { Nullable } from "@/utils/declare";
import axios, { AxiosRequestConfig } from "axios";
import { fromUnixTime, isAfter } from "date-fns";
import { InvalidTokenError, jwtDecode } from "jwt-decode";

export const axiosInstance = axios.create({
  timeout: 100000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

export const reqConfig: AxiosRequestConfig = {
  withCredentials: true, // Include credentials in requests
};

axiosInstance.interceptors.request.use(async (config) => {
  let accessToken = window.sessionStorage.getItem("access_token");
  if (accessToken) {
    try {
      const tokenDecoded = jwtDecode<{ exp: number }>(accessToken);

      //If access token is expired
      if (!isAfter(fromUnixTime(tokenDecoded.exp), Date.now())) {
        const newAccessToken: Nullable<string> = await refreshToken();

        if (newAccessToken) {
          window.sessionStorage.setItem("access_token", newAccessToken);
          accessToken = newAccessToken;
        }
      }
    } catch (error) {
      if (error instanceof InvalidTokenError)
        console.debug("AXIOS CONFIG : TOKEN DECODED : Invalid token");
      else console.debug(`AXIOS CONFIG : UNEXPECTED ${error}`);
    }

    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});
