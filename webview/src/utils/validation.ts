import type { ValidationResult } from "../types";

/**
 * Validates the secret length input
 * @param length - Length value to validate
 * @returns ValidationResult with isValid flag and optional error message
 */
export function validateLength(length: string | number): ValidationResult {
  if (!length) {
    return { isValid: false, error: "Length is required" };
  }

  const num = Number(length);
  if (isNaN(num)) {
    return { isValid: false, error: "Length must be a number" };
  }

  if (num < 1 || num > 256) {
    return { isValid: false, error: "Length must be between 1 and 256" };
  }

  return { isValid: true };
}

/**
 * Validates if output is available for copy/insert operations
 * @param output - Output string to validate
 * @returns ValidationResult
 */
export function validateOutput(output: string): ValidationResult {
  if (!output || output.trim().length === 0) {
    return { isValid: false, error: "Nothing to copy" };
  }

  return { isValid: true };
}

/**
 * Validates preset string
 * @param preset - Preset ID to validate
 * @returns ValidationResult
 */
export function validatePreset(preset: string): ValidationResult {
  if (!preset || preset.trim().length === 0) {
    return { isValid: false, error: "No preset selected" };
  }

  return { isValid: true };
}
