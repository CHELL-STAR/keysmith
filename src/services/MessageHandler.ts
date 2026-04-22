import * as vscode from "vscode";
import * as crypto from "crypto";
import {
  VSCodeMessage,
  ResultMessage,
  NotificationMessage,
  LevelPreset,
} from "../types";

/**
 * Service for handling messages from the webview
 * Single Responsibility: Handles all message processing logic
 */
export class MessageHandler {
  /**
   * Process a message from the webview
   */
  static handle(
    message: VSCodeMessage,
    webview: vscode.Webview,
    editor?: vscode.TextEditor,
  ): void {
    switch (message.type) {
      case "generate":
        this.handleGenerate(message, webview);
        break;
      case "uuid":
        this.handleUUID(webview);
        break;
      case "insert":
        this.handleInsert(message, editor);
        break;
      default:
        console.warn("Unknown message type:", message);
    }
  }

  private static sendNotification(
    webview: vscode.Webview,
    message: string,
    level: LevelPreset,
  ): void {
    const notification: NotificationMessage = {
      type: "notification",
      message,
      level,
    };

    webview.postMessage(notification);
  }

  /**
   * Handle generate message - create a random secret
   */
  private static handleGenerate(
    message: {
      type: "generate";
      length: number;
      format: string;
      value?: string;
    },
    webview: vscode.Webview,
  ): void {
    const shaFormats = ["sha256", "sha512", "sha384", "sha224", "sha1"];
    try {
      if (shaFormats.includes(message.format)) {
        if (!message.value || message.value.trim() === "") {
          const response: ResultMessage = {
            type: "result",
            value: "",
            success: false,
            message: "Please provide a value to hash.",
          };
          webview.postMessage(response);
          this.sendNotification(
            webview,
            "No value provided for hashing.",
            "error",
          );
          return;
        }
        const hash = crypto
          .createHash(message.format)
          .update(message.value)
          .digest("hex");

        const response: ResultMessage = {
          type: "result",
          value: hash,
          success: true,
          message: "Hash generated successfully.",
        };

        webview.postMessage(response);
        this.sendNotification(
          webview,
          "Hash generated successfully.",
          "success",
        );
        return;
      }

      const secret = crypto
        .randomBytes(message.length)
        .toString(message.format as BufferEncoding);

      const response: ResultMessage = {
        type: "result",
        value: secret,
        success: true,
        message: "Secret generated successfully.",
      };

      this.sendNotification(
        webview,
        "Secret generated successfully.",
        "success",
      );

      webview.postMessage(response);
    } catch (error) {
      console.error("Error generating secret:", error);
      const response: ResultMessage = {
        type: "result",
        value: "",
        success: false,
        message: "An error occurred while generating the secret.",
      };
      webview.postMessage(response);
      this.sendNotification(webview, "Failed to generate secret.", "error");
    }
  }

  /**
   * Handle UUID generation
   */
  private static handleUUID(webview: vscode.Webview): void {
    try {
      const uuid = crypto.randomUUID();

      const response: ResultMessage = {
        type: "result",
        value: uuid,
        success: true,
        message: "UUID generated successfully.",
      };

      webview.postMessage(response);
      this.sendNotification(webview, "UUID generated successfully.", "success");
    } catch (error) {
      console.error("Error generating UUID:", error);
      const response: ResultMessage = {
        type: "result",
        value: "",
        success: false,
        message: "An error occurred while generating the UUID.",
      };
      webview.postMessage(response);
      this.sendNotification(webview, "Failed to generate UUID.", "error");
    }
  }

  /**
   * Handle insert message - insert value at cursor position
   */
  private static handleInsert(
    message: { type: "insert"; value: string },
    editor?: vscode.TextEditor,
  ): void {
    if (!editor) {
      console.warn("No active editor found to insert text.");
      return;
    }

    editor.edit((editBuilder) => {
      editBuilder.insert(editor.selection.active, message.value);
    });
  }
}
