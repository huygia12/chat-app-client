import { refreshToken } from "@/apis/auth";
import axios, { AxiosRequestConfig } from "axios";
import { fromUnixTime, isAfter } from "date-fns";
import { InvalidTokenError, jwtDecode } from "jwt-decode";
import { Nullable } from "./declare";

const axiosInstance = axios.create({
  timeout: 100000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

const axiosInstanceBackUp = axios.create({
  timeout: 50000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

const reqConfig: AxiosRequestConfig = {
  withCredentials: true, // Include credentials in requests
};

axiosInstance.interceptors.request.use(async (config) => {
  let accessToken = window.sessionStorage.getItem("access_token");
  if (accessToken) {
    try {
      const tokenDecoded = jwtDecode<{ exp: number }>(accessToken);

      //If access token is expired
      if (!isAfter(fromUnixTime(tokenDecoded.exp), Date.now())) {
        const newAccessToken: Nullable<string> =
          await refreshToken(axiosInstanceBackUp);

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

export { axiosInstance, reqConfig };
