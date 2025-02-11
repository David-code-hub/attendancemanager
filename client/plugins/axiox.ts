import axios from "axios";
import type { AxiosInstance } from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
  }) as AxiosInstance;

  return {
    provide: {
      api,
    },
  };
});
