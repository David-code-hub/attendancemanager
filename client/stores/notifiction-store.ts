import { defineStore } from "pinia";
import type { NotificationTypes, Notification } from "../types/app";

export const useNotificationStore = defineStore("notification", {
  state: () => ({
    notification: {} as Notification,
  }),

  actions: {
    showNotification(type: NotificationTypes, message: string) {
      this.notification = {
        type: type,
        message: message,
        showMessage: true,
      };

      // remove after duration
      setTimeout(() => (this.notification.showMessage = false), 3000);
    },
  },
});
