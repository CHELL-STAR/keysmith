import {
  VSCodeTextField,
  VSCodeDropdown,
  VSCodeOption,
} from "@vscode/webview-ui-toolkit/react";

type Props = {
  length: string;
  setLength: (v: string) => void;
  format: string;
  setFormat: (v: string) => void;
};

type FormProps = {
  target: {
    value: string;
  };
};

export default function InputSection({
  length,
  setLength,
  format,
  setFormat,
}: Props) {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold">Key Length</label>
          <VSCodeTextField
            className="w-full"
            value={length}
            // @ts-expect-error bcz
            onInput={(e: FormProps) => setLength(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold">Encoding</label>
          <VSCodeDropdown
            className="w-full space-y-1"
            value={format}
            // @ts-expect-error bcz
            onChange={(e: FormProps) => setFormat(e.target.value)}
          >
            <VSCodeOption value="hex" className="pl-2">Hexadecimal</VSCodeOption>
            <VSCodeOption value="base64" className="pl-2">Base64</VSCodeOption>
          </VSCodeDropdown>
        </div>
      </div>
    </>
  );
}
