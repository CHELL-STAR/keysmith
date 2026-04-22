import type { ExtensionMessage } from "../types";
import { useCallback, useEffect } from "react";

type MessageCallback = {
  onResult?: (value: string)=> void;
}

/**
 * Custom hook for listening to messages from VS Code extension
 * @param onMessage - Callback when result message is received
 */
export function useMessageListener(
  callbacks: MessageCallback
): void {
  const { onResult } = callbacks;

  const handleMessage = useCallback((event: MessageEvent<ExtensionMessage>)=> {
    const {data} = event;

    if(data.type === "result" && onResult) {
      onResult(data.value);
    }


  }, [onResult])

  useEffect(()=> {
    window.addEventListener("message", handleMessage as EventListener);

    return()=> {
      window.removeEventListener('message', handleMessage as EventListener)
    }
  }, [handleMessage])
}
