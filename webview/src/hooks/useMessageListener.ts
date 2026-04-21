import type { ResultMessage } from "../types";
import { useEffect } from "react";

/**
 * Custom hook for listening to messages from VS Code extension
 * @param onMessage - Callback when result message is received
 */
export function useMessageListener(
  onMessage: (value: string) => void
): void {
  useEffect(() => {
    const handleMessage = (event: MessageEvent<ResultMessage>) => {
      if (event.data.type === "result") {
        onMessage(event.data.value);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [onMessage]);
}
