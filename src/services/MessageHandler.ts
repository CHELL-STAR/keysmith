import * as vscode from "vscode";
import * as crypto from "crypto";
import { VSCodeMessage, ResultMessage } from "../types";

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

  /**
   * Handle generate message - create a random secret
   */
  private static handleGenerate(
    message: { type: "generate"; length: number; format: string },
    webview: vscode.Webview,
  ): void {
    try {
      const secret = crypto
        .randomBytes(message.length)
        .toString(message.format as BufferEncoding);

      const response: ResultMessage = {
        type: "result",
        value: secret,
        message: "Secret generated successfully",
      };

      webview.postMessage(response);
    } catch (error) {
      console.error("Error generating secret:", error);
      const response: ResultMessage = {
        type: "result",
        value: "",
        message: "Error generating secret",
      };
      webview.postMessage(response);
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
        message: "UUID created successfully",
      };

      webview.postMessage(response);
    } catch (error) {
      console.error("Error generating UUID:", error);
      const response: ResultMessage = {
        type: "result",
        value: "",
        message: "Error generating UUID",
      };
      webview.postMessage(response);
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
      console.warn("No active editor to insert text");
      return;
    }

    editor.edit((editBuilder) => {
      editBuilder.insert(editor.selection.active, message.value);
    });
  }
}
