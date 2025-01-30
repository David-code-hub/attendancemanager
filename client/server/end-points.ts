import { useNuxtApp } from "nuxt/app";
import { useAsyncState } from "@vueuse/core";
import type { AxiosInstance } from "axios";

export const handleEndpoints = () => {
  const { $api } = useNuxtApp();
  const api = $api as AxiosInstance;

  const useRequest = <T>(fn: () => Promise<T>) => {
    const { state, isLoading, execute } = useAsyncState(fn, {} as T, { immediate: false });
    return { state, isLoading, execute };
  };

  const handleLogin = (username: string, password: string) => useRequest(() => api.post("/api/login/", { username, password }).then((res) => res.data));

  return {
    handleLogin,
  };
};
