import { copyWithFeedback } from "../utils/clipboard";
import { validateOutput } from "../utils/validation";

type Props = {
  output: string;
  notification: {
    showSuccess: (msg: string) => void;
    showError: (msg: string) => void;
  };
};

/**
 * Output Component
 * Single Responsibility: Displays and manages copy action for output
 * Uses utility functions for validation and clipboard operations (DRY)
 */
export default function Output({ output, notification }: Props) {
  /**
   * Handle click to copy output
   */
  const copyOnClick = async () => {
    const validation = validateOutput(output);
    if (!validation.isValid) {
      notification.showError(validation.error!);
      return;
    }

    const result = await copyWithFeedback(output);
    if (result.success) {
      notification.showSuccess(result.message);
    } else {
      notification.showError(result.message);
    }
  };

  return (
    <div className="flex flex-col gap-1.5 mt-2">
      <label className="text-[11px] font-bold">Result</label>
      <div
        className="p-3 text-xs font-mono break-all rounded border border-(--vscode-widget-border) bg-(--vscode-textCodeBlock-background) text-(--vscode-textLink-foreground) min-h-10 cursor-pointer hover:border-(--vscode-focusBorder) transition-colors"
        onClick={copyOnClick}
      >
        {output || "Generate a key to get started"}
      </div>
    </div>
  );
}
