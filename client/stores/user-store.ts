import { defineStore } from "pinia";
import type { User } from "~/types/app";

export const useUserStore = defineStore("user", {
  state: () => ({
    access_token: "",
    refresh_token: "",
    user: {} as User,
  }),

  actions: {
    saveUserDetails(access_token: string, refresh_token: string, user: User) {
      this.access_token = access_token;
      this.refresh_token = refresh_token;
      this.user = user;
    },
    clearUserStore() {
      this.access_token = "";
      this.refresh_token = "";
      this.user = { username: "", email: "" };
      console.log("access token :", this.access_token);
    },
  },
  persist: true,
});
