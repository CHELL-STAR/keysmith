import type { ExtensionMessage, LevelPreset } from "../types";
import { useCallback, useEffect } from "react";

type MessageCallback = {
  onResult?: (value: string)=> void;
  onNotification?: (message: string, level: LevelPreset)=> void;
}

/**
 * Custom hook for listening to messages from VS Code extension
 * @param onMessage - Callback when result message is received
 */
export function useMessageListener(
  callbacks: MessageCallback
): void {
  const { onResult, onNotification } = callbacks;

  const handleMessage = useCallback((event: MessageEvent<ExtensionMessage>)=> {
    const {data} = event;

    if(data.type === "result" && onResult) {
      onResult(data.value);
    }

    if(data.type === "notification" && onNotification) {
      onNotification(data.message, data.level);
    }


  }, [onResult, onNotification])

  useEffect(()=> {
    window.addEventListener("message", handleMessage as EventListener);

    return()=> {
      window.removeEventListener('message', handleMessage as EventListener)
    }
  }, [handleMessage])
}
