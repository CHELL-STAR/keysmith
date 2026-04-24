import type { PresetConfig } from "../types";

/**
 * Preset configurations
 * Open/Closed Principle: Easy to add new presets without modifying existing code
 */
const PRESETS: Record<string, PresetConfig> = {
  jwt: {
    id: "jwt",
    label: "JWT",
    icon: "codicon-type-hierarchy-sub",
    iconSize: {
        width: 12,
        height: 12
    },
    color: "bg-blue-800",
    hoverColor: "hover:bg-blue-600",
    successMessage: "JWT Secret created successfully",
    message: {
      type: "generate",
      length: 64,
      format: "base64",
    },
  },
  cookie: {
    id: "cookie",
    label: "Cookie",
    icon: "codicon-globe",
    color: "bg-emerald-800",
    iconSize: {
        width: 14,
        height: 14
    },
    hoverColor: "hover:bg-emerald-600",
    successMessage: "Cookie Secret created successfully",
    message: {
      type: "generate",
      length: 32,
      format: "hex",
    },
  },
  api: {
    id: "api",
    label: "API",
    icon: "codicon-key",
    color: "bg-red-800",
    iconSize: {
        width: 14,
        height: 14
    },
    hoverColor: "hover:bg-red-600",
    successMessage: "API Secret created successfully",
    message: {
      type: "generate",
      length: 48,
      format: "base64",
    },
  },
  uuid: {
    id: "uuid",
    label: "UUID",
    icon: "codicon-flame",
    color: "bg-purple-800",
    iconSize: {
        width: 14,
        height: 14
    },
    hoverColor: "hover:bg-purple-600",
    successMessage: "UUID created successfully",
    message: {
      type: "uuid",
    },
  },
};

/**
 * Service for preset operations
 */
export class PresetService {
  /**
   * Get all available presets
   */
  static getAll(): PresetConfig[] {
    return Object.values(PRESETS);
  }

  /**
   * Get preset by ID
   */
  static getById(id: string): PresetConfig | undefined {
    return PRESETS[id];
  }

  /**
   * Check if preset exists
   */
  static exists(id: string): boolean {
    return id in PRESETS;
  }
}
