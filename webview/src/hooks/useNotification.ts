import { useEffect, useState, useCallback } from "react";
import type { LevelPreset } from "../types";

export interface NotificationState {
  message: string;
  level: LevelPreset;
}
const NOTIFICATION_DURATION = 3000; // 3 seconds

/**
 * Custom hook for managing notification state
 * Encapsulates message and error handling with auto-clear functionality
 * @param duration - Duration in ms to show notification (default: 3000)
 */
export function useNotification(duration: number = NOTIFICATION_DURATION) {
  const [notification, setNotification] = useState<NotificationState>({
    message: "",
    level: "success",
  });

  /**
   * Sets a success message that auto-clears after duration
   */
  const showNotification = useCallback(
    (message: string, level: LevelPreset) => {
      setNotification({ message, level });
    },
    []
  );

  /**
   * Clears the notification immediately
   */
  const clear = useCallback(() => {
    setNotification({ message: "", level: "success" });
  }, []);

  useEffect(() => {
    if (!notification.message) return;

    const timer = setTimeout(() => {
      clear();
    }, duration);

    return () => clearTimeout(timer);
  }, [notification.message, duration, clear]);

  return {
    ...notification,
    showNotification,
    clear,
    isError: notification.level === "error"
  };
}
