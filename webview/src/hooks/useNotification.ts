import type { NotificationState } from "../types";
import { useEffect, useState, useCallback } from "react";

const NOTIFICATION_DURATION = 3000; // 3 seconds

/**
 * Custom hook for managing notification state
 * Encapsulates message and error handling with auto-clear functionality
 * @param duration - Duration in ms to show notification (default: 3000)
 * @returns Notification state and setter functions
 */
export function useNotification(duration: number = NOTIFICATION_DURATION) {
  const [notification, setNotification] = useState<NotificationState>({
    message: "",
    isError: false,
  });

  /**
   * Sets a success message that auto-clears after duration
   */
  const showSuccess = useCallback(
    (message: string) => {
      setNotification({ message, isError: false });
    },
    []
  );

  /**
   * Sets an error message that auto-clears after duration
   */
  const showError = useCallback(
    (message: string) => {
      setNotification({ message, isError: true });
    },
    []
  );

  /**
   * Clears the notification immediately
   */
  const clear = useCallback(() => {
    setNotification({ message: "", isError: false });
  }, []);

  // Auto-clear notification after duration
  useEffect(() => {
    if (!notification.message) return;

    const timer = setTimeout(() => {
      clear();
    }, duration);

    return () => clearTimeout(timer);
  }, [notification.message, duration, clear]);

  return {
    ...notification,
    showSuccess,
    showError,
    clear,
  };
}
