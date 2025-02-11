import axios from "axios";
import type { AxiosInstance } from "axios";

import { useUserStore } from "#imports";

export default defineNuxtPlugin((nuxtApp) => {
  const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
  }) as AxiosInstance;

  api.interceptors.request.use((config) => {
    const userStore = useUserStore();
    if (userStore.access_token) {
      config.headers.Authorization = `Bearer ${userStore.access_token}`;
    }
    return config;
  });

  return {
    provide: {
      api,
    },
  };
});
