import { vscode } from "../hooks/global.hook";
import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";

type Props = {
  length: string;
  format: string;
  output: string;
  setMessage: (msg: string) => void;
  setIsError: (val: boolean) => void;
};

export default function Actions({ length, format, output, setIsError, setMessage }: Props) {
  const generate = () => {
    const num = Number(length);
    if (!length) {
      setMessage("Length is required");
      setIsError(true);
      return;
    }

    if (isNaN(num)) {
      setMessage("Length must be a number");
      setIsError(true);
      return;
    }

    if (num < 1 || num > 256) {
      setMessage("Length must be between 1 and 256");
      setIsError(true);
      return;
    }

    setIsError(false);
    setMessage("Secret generated successfully");

    vscode.postMessage({
      type: "generate",
      length: num,
      format,
    });
  };

  const copy = () => {
  if (!output) {
    setMessage("Nothing to copy");
    setIsError(true);
    return;
  }

  navigator.clipboard.writeText(output);
  setMessage("Copied to clipboard");
  setIsError(false);
};

  const insert = () => {
    if (!output) return;
    vscode.postMessage({
      type: "insert",
      value: output,
    });
  };

  return (
    <div className="grid grid-cols-2 gap-2 mt-2">
      <VSCodeButton className="col-span-2" onClick={generate}>
        Generate New Key
        <span slot="start" className="codicon codicon-sync"></span>
      </VSCodeButton>

      <VSCodeButton appearance="secondary" onClick={copy} disabled={!output}>
        Copy
        <span slot="start" className="codicon codicon-copy"></span>
      </VSCodeButton>

      <VSCodeButton appearance="secondary" onClick={insert} disabled={!output}>
        Insert
        <span slot="start" className="codicon codicon-edit"></span>
      </VSCodeButton>
    </div>
  );
}
