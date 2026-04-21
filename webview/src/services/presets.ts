import type { PresetConfig } from "../types";
import jwt from "../assets/images/jsonwebtokens.svg";
import api from "../assets/images/api-settings.svg";
import cookie from "../assets/images/cookie.svg";
import uuid from "../assets/images/uuid-backfill.svg";

/**
 * Preset configurations
 * Open/Closed Principle: Easy to add new presets without modifying existing code
 */
const PRESETS: Record<string, PresetConfig> = {
  jwt: {
    id: "jwt",
    label: "JWT",
    icon: jwt,
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
    icon: cookie,
    color: "bg-emerald-800",
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
    icon: api,
    color: "bg-red-800",
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
    icon: uuid,
    color: "bg-purple-800",
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
