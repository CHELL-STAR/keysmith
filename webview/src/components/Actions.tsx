import type { GenerateMessage, LevelPreset } from "../types";
import { vscode } from "../hooks/global.hook";
import { validateLength, validateOutput } from "../utils/validation";
import { copyWithFeedback } from "../utils/clipboard";
import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";

type Props = {
  length: string;
  format: string;
  output: string;
  value?: string;
  notification: {
    showNotification: (message: string, level: LevelPreset) => void;
  };
};

enum Formats {
  hex = "hex",
  base64 = "base64",
  sha256 = "sha256",
  sha512 = "sha512",
}

/**
 * Actions Component
 * Single Responsibility: Handles user actions for generating, copying, and inserting secrets
 * Uses utility functions for validation and clipboard operations (DRY principle)
 */
export default function Actions({
  length,
  format,
  output,
  notification,
  value,
}: Props) {
  /**
   * Generate new secret
   */
  const generate = () => {
    // Use validation utility (DRY)
    const validation = validateLength(length);
    if (!validation.isValid) {
      notification.showNotification(validation.error!, "error");
      return;
    }

    const message: GenerateMessage = {
      type: "generate",
      length: Number(length),
      format: format as Formats,
      value,
    };

    vscode.postMessage(message);
  };

  /**
   * Copy output to clipboard
   */
  const copy = async () => {
    // Use validation utility (DRY)
    const validation = validateOutput(output);
    if (!validation.isValid) {
      notification.showNotification(validation.error!, "error");
      return;
    }

    // Use clipboard utility with feedback
    const result = await copyWithFeedback(output);
    if (result.success) {
      notification.showNotification(result.message, "success");
    } else {
      notification.showNotification(result.message, "error");
    }
  };

  /**
   * Insert output at cursor position
   */
  const insert = () => {
    const validation = validateOutput(output);
    if (!validation.isValid) {
      notification.showNotification(validation.error!, "error");
      return;
    }

    vscode.postMessage({
      type: "insert",
      value: output,
    });
  };

  return (
    <div className="flex flex-col gap-3 mt-5">
      {/* Primary Action - Generate */}
      <VSCodeButton onClick={generate} className={"w-full rounded-lg"}>
        <span className="w-full flex items-center gap-2">
          <i className="codicon codicon-refresh"/>
          <span>Generate New Key</span>
        </span>
      </VSCodeButton>

      {/* Secondary Actions Grid */}
      <div className="grid grid-cols-2 w-full gap-3">
        {/* Copy Button */}
        <VSCodeButton onClick={copy} disabled={!output} className="rounded-lg">
          <span className="w-full flex items-center gap-2">
            <i className="codicon codicon-copy"/>
            <span>Copy</span>
          </span>
        </VSCodeButton>

        {/* Insert Button */}
        <VSCodeButton onClick={insert} disabled={!output} className="rounded-lg">
          <span className="w-full flex items-center gap-2">
           <i className="codicon codicon-edit-sparkle"/>
            <span>Insert</span>
          </span>
        </VSCodeButton>
      </div>
    </div>
  );
}
