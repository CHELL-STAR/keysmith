type Props = {
  output: string;
  setMessage: (msg: string) => void;
  setIsError: (val: boolean) => void;
};

export default function Output({ output, setIsError, setMessage }: Props) {
  function copyOnClick() {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setMessage("Copied to clipboard");
    setIsError(false);
  }
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
