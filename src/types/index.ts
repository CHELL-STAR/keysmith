/**
 * Message types sent from webview to extension
 * These are duplicated from webview for module isolation
 */
export interface GenerateMessage {
  type: "generate";
  length: number;
  format: "hex" | "base64" | "sha256" | "sha512";
  value?: string;
}

export interface UUIDMessage {
  type: "uuid";
}

export type LevelPreset = "success" | "error" | "warning" | "info"

export interface InsertMessage {
  type: "insert";
  value: string;
}

export type VSCodeMessage = GenerateMessage | UUIDMessage | InsertMessage;

/**
 * Result message from extension to webview
 */
export interface ResultMessage {
  type: "result";
  value: string;
  success: boolean;
  message?: string;
}

export interface NotificationMessage {
  type: "notification",
  message: string;
  level: LevelPreset
}

export type ExtensionToWebviewMessage = ResultMessage | NotificationMessage;
