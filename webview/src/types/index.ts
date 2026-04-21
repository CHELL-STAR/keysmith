/**
 * Message types sent from webview to extension
 */
export interface GenerateMessage {
  type: "generate";
  length: number;
  format: "hex" | "base64";
}

export interface UUIDMessage {
  type: "uuid";
}

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
  message?: string;
}

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
}

/**
 * Notification state
 */
export interface NotificationState {
  message: string;
  isError: boolean;
}

/**
 * Validation result
 */
export interface ValidationResult {
  isValid: boolean;
  error?: string;
}
