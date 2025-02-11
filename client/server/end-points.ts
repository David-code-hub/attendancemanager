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
  const { $api } = useNuxtApp();
  const router = useRouter();

  const handleAuth = () => {
    $api.defaults.headers.common["Authorization"] = `Bearer ${useUserStore().access_token}`;
  };

  const handleLogout = (error: string) => {
    if (error === "Authentication credentials were not provided." || error === "Given token not valid for any token type") {
      userStore.clearUserStore();
      router.push("/");
    }
  };

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
          handleAuth();
          router.push("/home");
          return response;
        })
        .catch((error: AxiosError) => {
          notificationStore.showNotification("error", (error?.response?.data as APIError).detail ?? "Error occured while logging in.");
          return error.response;
        }),
    );

  const handleGetStudentsGroup = () =>
    useRequest(() =>
      $api
        .get("/api/student-groups/")
        .then((res: AxiosResponse<any>) => {
          const response = res.data;
          console.log("students groups :", response);
          return response;
        })
        .catch((error: AxiosError) => {
          notificationStore.showNotification("error", (error?.response?.data as APIError).detail ?? "Error occured while fetching students in.");
          handleLogout((error?.response?.data as APIError).detail);
          return error.response;
        }),
    );

  return {
    handleLogin,
    handleGetStudentsGroup,
  };
};
