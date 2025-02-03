export type NotificationTypes = "error" | "success" | "info";

export interface Notification {
  type: NotificationTypes;
  message: string;
  showMessage: Boolean;
  duration?: number;
}

export interface User {
  username: string;
  email: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
  username: string;
  email: string;
}

export interface APIError {
  detail: string;
  status_code?: number;
}
