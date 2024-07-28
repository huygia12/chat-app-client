import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  timeout: 100000, // Timeout set to 5 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

const reqConfig: AxiosRequestConfig = {
  withCredentials: true, // Include credentials in requests
};

export { axiosInstance, reqConfig };
