import type { GenerateMessage } from "../types";
import { vscode } from "../hooks/global.hook";
import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";
import { validateLength, validateOutput } from "../utils/validation";
import { copyWithFeedback } from "../utils/clipboard";
import refresh from "../assets/images/refresh.svg";
import copyimg from "../assets/images/copy.svg";

type Props = {
  length: string;
  format: string;
  output: string;
  notification: {
    showSuccess: (msg: string) => void;
    showError: (msg: string) => void;
  };
};

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
}: Props) {
  /**
   * Generate new secret
   */
  const generate = () => {
    // Use validation utility (DRY)
    const validation = validateLength(length);
    if (!validation.isValid) {
      notification.showError(validation.error!);
      return;
    }

    notification.showSuccess("Secret generated successfully");

    const message: GenerateMessage = {
      type: "generate",
      length: Number(length),
      format: format as "hex" | "base64",
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
      notification.showError(validation.error!);
      return;
    }

    // Use clipboard utility with feedback
    const result = await copyWithFeedback(output);
    if (result.success) {
      notification.showSuccess(result.message);
    } else {
      notification.showError(result.message);
    }
  };

  /**
   * Insert output at cursor position
   */
  const insert = () => {
    const validation = validateOutput(output);
    if (!validation.isValid) {
      notification.showError(validation.error!);
      return;
    }

    vscode.postMessage({
      type: "insert",
      value: output,
    });

    notification.showSuccess("Secret inserted successfully");
  };

  return (
    <div className="flex flex-col gap-2 mt-2">
      <VSCodeButton
        className="bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-all duration-300"
        onClick={generate}
      >
        <img
          src={refresh}
          alt="Generate Key"
          className="invert-100 opacity-70 mr-2"
          width={14}
          height={14}
        />
        Generate New Key
      </VSCodeButton>

      <div className="grid grid-cols-2 w-full gap-2">
        <VSCodeButton appearance="secondary" onClick={copy} disabled={!output}>
          <img
            src={copyimg}
            alt="Generate Key"
            className="invert-100 opacity-70 mr-2"
            width={14}
            height={14}
          />
          Copy
        </VSCodeButton>

        <VSCodeButton appearance="secondary" onClick={insert} disabled={!output}>
          Insert
          <span slot="start" className="codicon codicon-edit"></span>
        </VSCodeButton>
      </div>
    </div>
  );
}
