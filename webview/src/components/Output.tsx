type Props = {
  output: string;
};

export default function Output({ output }: Props) {
  return (
    <div className="flex flex-col gap-1.5 mt-2">
      <label className="text-[11px] font-bold">Result</label>
      <div 
        className="p-3 text-xs font-mono break-all rounded border border-(--vscode-widget-border) bg-(--vscode-textCodeBlock-background) text-(--vscode-textLink-foreground) min-h-10 cursor-pointer hover:border-(--vscode-focusBorder) transition-colors"
        onClick={() => output && navigator.clipboard.writeText(output)}
      >
        {output || "No key generated..."}
      </div>
    </div>
  );
}