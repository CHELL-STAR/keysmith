/**
 * Utility functions for clipboard operations
 */

/**
 * Copies text to clipboard asynchronously
 * @param text - Text to copy
 * @returns Promise that resolves when copy is successful
 * @throws Error if clipboard API is not available or copy fails
 */
export async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    throw new Error("Failed to copy to clipboard");
  }
}

/**
 * Copies text to clipboard and returns a notification message
 * @param text - Text to copy
 * @returns Success message or error message
 */
export async function copyWithFeedback(text: string): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    await copyToClipboard(text);
    return { success: true, message: "Copied to clipboard" };
  } catch {
    return { success: false, message: "Failed to copy to clipboard" };
  }
}
