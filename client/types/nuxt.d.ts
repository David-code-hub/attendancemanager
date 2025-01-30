import type { AxiosInstance } from "axios";
import type { NuxtApp } from "#app";

declare module "#app" {
  interface NuxtApp {
    $api: AxiosInstance;
  }
}
