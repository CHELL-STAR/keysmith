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
    <div className="bg-gradient-to-br from-slate-800/40 to-slate-700/20 rounded-xl p-4 border border-slate-600/30 backdrop-blur-sm mb-4">
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-300">
            Key Length
            <span className="ml-1 text-indigo-400">({length} bytes)</span>
          </label>
          <VSCodeTextField
            className="w-full"
            value={length}
            // @ts-expect-error bcz
            onInput={(e: FormProps) => setLength(e.target.value)}
            placeholder="Enter key length (1-256)"
          />
          <p className="text-[10px] text-slate-400">
            Length of the generated secret in bytes
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-300">
            Encoding Format
          </label>
          <VSCodeDropdown
            className="w-full"
            value={format}
            // @ts-expect-error bcz
            onChange={(e: FormProps) => setFormat(e.target.value)}
          >
            <VSCodeOption value="hex">
              🔷 Hexadecimal
            </VSCodeOption>
            <VSCodeOption value="base64">
              🔶 Base64
            </VSCodeOption>
          </VSCodeDropdown>
          <p className="text-[10px] text-slate-400">
            {format === "hex"
              ? "Hexadecimal format: 0-9, A-F"
              : "Base64 format: A-Z, a-z, 0-9, +, /"}
          </p>
        </div>
      </div>
    </div>
  );
}
