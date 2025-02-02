import { defineStore } from "pinia";
import type { NotificationTypes, Notification } from "../types/app";

export const useNotificationStore = defineStore("notification", {
  state: () => ({
    notification: {} as Notification,
  }),

  actions: {
    showNotification(type: NotificationTypes, message: string, duration = 3000) {
      console.log("showing message");
      this.notification = {
        type: type,
        message: message,
        showMessage: true,
      };
      // remove after duration
      //   setTimeout(() => this.removeNotification(id), duration);
    },
  },
});
