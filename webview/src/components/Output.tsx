import { copyWithFeedback } from "../utils/clipboard";
import { validateOutput } from "../utils/validation";
import lock from "../assets/images/lock.svg";

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
    <div className="flex flex-col gap-2.5 mt-6">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
          <img
            src={lock}
            alt={"Results"}
            className="w-4 h-4 invert opacity-80 group-hover:opacity-100 transition-opacity"
          />
          Generated Result
        </label>
        {output && (
          <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
            Ready to copy
          </span>
        )}
      </div>
      <div
        onClick={copyOnClick}
        className={`group relative px-4 py-4 rounded-xl transition-all duration-300 cursor-pointer
        `}
      >
        <div className="flex flex-col items-center justify-between">
          <code className="bg-[#101213] w-full p-2 font-mono text-slate-300 break-all flex-1 select-all text-xs">
            {output || (
              <span className="text-slate-500">
                Your generated secret will appear here...
              </span>
            )}
          </code>
          {output && (
            <div className="ml-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400 font-semibold text-sm">
              Copy
            </div>
          )}
        </div>
      </div>
      {output && (
        <p className="text-[10px] text-slate-400 text-center">
          Click to copy to clipboard
        </p>
      )}
    </div>
  );
}
