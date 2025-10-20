import { notification } from "antd";
import { TNotificationConfig, TNotificationStatus } from "../types/notification";
import { formatCapitalize } from "./formatter";

const createNotification = (status: TNotificationStatus) => {
  return (config: TNotificationConfig) => {
    notification[status]({
      ...config,
      message: config.message ?? (status === "error" ? "Failed" : formatCapitalize(status)),
    });
  };
};

export const notif = {
  success: createNotification("success"),
  info: createNotification("info"),
  warning: createNotification("warning"),
  error: createNotification("error"),
};
