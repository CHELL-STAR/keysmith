/**
 * Message types sent from webview to extension
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

export interface InsertMessage {
  type: "insert";
  value: string;
}

export type LevelPreset = "success" | "error" | "info" | "warning";

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


export type ExtensionMessage = ResultMessage | NotificationMessage;

/**
 * Preset configuration
 */
export interface PresetConfig {
  id: string;
  label: string;
  icon: string;
  color: string;
  hoverColor: string;
  successMessage: string;
  message: GenerateMessage | UUIDMessage;
  iconSize: {
    width: number
    height: number
  }
}

/**
 * Notification state
 */
export interface NotificationState {
  message: string;
  level: LevelPreset,
  isError?: boolean;
}

/**
 * Validation result
 */
export interface ValidationResult {
  isValid: boolean;
  error?: string;
}
