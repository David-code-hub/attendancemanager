export type NotificationTypes = "error" | "success" | "info";

export interface Notification {
  type: NotificationTypes;
  message: string;
  showMessage: Boolean;
  duration?: number;
}
