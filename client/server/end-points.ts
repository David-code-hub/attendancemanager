import { useNuxtApp } from "nuxt/app";
import { useAsyncState } from "@vueuse/core";
import type { AxiosInstance } from "axios";
import { useNotificationStore } from "~/stores/notifiction-store";

export const handleEndpoints = () => {
  const notificationStore = useNotificationStore();

  const { $api } = useNuxtApp();
  const api = $api as AxiosInstance;

  const useRequest = <T>(fn: () => Promise<T>) => {
    const { state, isLoading, execute } = useAsyncState(fn, {} as T, { immediate: false });
    return { state, isLoading, execute };
  };

  const handleLogin = (username: string, password: string) =>
    useRequest(() =>
      api
        .post("/api/login/", { username, password })
        .then((res) => {
          const response = res.data;
          notificationStore.showNotification("success", "You have successfully logged in!");
          return response;
        })
        .catch((error) => {
          notificationStore.showNotification("error", error.response.data?.detail ?? "Error occured while logging in.");
          return error.response;
        }),
    );

  return {
    handleLogin,
  };
};
