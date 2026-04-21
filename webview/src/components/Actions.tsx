import type { GenerateMessage } from "../types";
import { vscode } from "../hooks/global.hook";
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
    <div className="flex flex-col gap-3 mt-5">
      {/* Primary Action - Generate */}
      <button
        onClick={generate}
        className="w-full px-2 py-1.5 rounded-lg font-semibold text-white bg-neutral-950 hover:bg-neutral-800 transition-all duration-200 flex items-center justify-center gap-2 active:translate-y-px disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <img
          src={refresh}
          alt="Generate Key"
          className="w-4 h-4 invert"
        />
        <span>Generate New Key</span>
      </button>

      {/* Secondary Actions Grid */}
      <div className="grid grid-cols-2 w-full gap-3">
        {/* Copy Button */}
        <button
          onClick={copy}
          disabled={!output}
          className="px-2 py-1.5 rounded-lg font-medium text-blue-200 bg-blue-700/50 hover:bg-blue-600 active:bg-blue-700 border border-blue-600/50 hover:border-blue-500 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-md active:translate-y-px"
        >
          <img
            src={copyimg}
            alt="Copy"
            className="w-4 h-4 invert opacity-80"
          />
          <span>Copy</span>
        </button>

        {/* Insert Button */}
        <button
          onClick={insert}
          disabled={!output}
          className="px-2 py-1.5 rounded-lg font-medium text-blue-200 bg-blue-700/50 hover:bg-blue-600 active:bg-blue-700 border border-blue-600/50 hover:border-blue-500 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-md active:translate-y-px"
        >
          <span className="codicon codicon-edit text-lg"></span>
          <span>Insert</span>
        </button>
      </div>
    </div>
  );
}
