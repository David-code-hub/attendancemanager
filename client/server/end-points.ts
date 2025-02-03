import { useNuxtApp } from "nuxt/app";
import { useRouter } from "vue-router";
import { useAsyncState } from "@vueuse/core";
import type { AxiosError, AxiosResponse } from "axios";

import { useNotificationStore } from "~/stores/notifiction-store";
import { useUserStore } from "~/stores/user-store";

import type { LoginResponse, APIError, User } from "~/types/app";

export const handleEndpoints = () => {
  const notificationStore = useNotificationStore();
  const userStore = useUserStore();
  const router = useRouter();
  const { $api } = useNuxtApp();

  const useRequest = <T>(fn: () => Promise<T>) => {
    const { state, isLoading, execute } = useAsyncState(fn, {} as T, { immediate: false });
    return { state, isLoading, execute };
  };

  const handleLogin = (username: string, password: string) =>
    useRequest(() =>
      $api
        .post("/api/login/", { username, password })
        .then((res: AxiosResponse<LoginResponse>) => {
          const response = res.data;
          userStore.saveUserDetails(response.access, response.refresh, {
            username: response.username,
            email: response.email,
          } as User);
          notificationStore.showNotification("success", "You have successfully logged in!");
          // set auth headers
          $api.defaults.headers.common["Authorization"] = `Bearer ${response.access}`;
          router.push("/home");
          return response;
        })
        .catch((error: AxiosError) => {
          notificationStore.showNotification("error", (error?.response?.data as APIError).detail ?? "Error occured while logging in.");
          return error.response;
        }),
    );

  return {
    handleLogin,
  };
};
