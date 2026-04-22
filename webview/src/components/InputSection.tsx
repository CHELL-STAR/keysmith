import {
  VSCodeTextField,
  VSCodeDropdown,
  VSCodeOption,
} from "@vscode/webview-ui-toolkit/react";
import { useState } from "react";
import { EncodeHash } from "./Tabs";
import { SHA_ALGORITHAMS } from "../constant/global.constant";

type Props = {
  length: string;
  setLength: (v: string) => void;
  format: string;
  setFormat: (v: string) => void;
  setValue?: (v: string) => void;
  value?: string;
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
  value,
  setValue,
}: Props) {
  const [encodeTab, setEncodeTab] = useState(true);
  return (
    <>
      <EncodeHash
        setEncodeTab={setEncodeTab}
        encodeTab={encodeTab}
        setFormat={setFormat}
      />

      {encodeTab ? (
        <div className="bg-linear-to-br from-slate-800/40 to-slate-700/20 rounded-xl p-4 border border-slate-600/30 backdrop-blur-sm mb-4">
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
                <VSCodeOption value="hex">🔷 Hexadecimal</VSCodeOption>
                <VSCodeOption value="base64">🔶 Base64</VSCodeOption>
              </VSCodeDropdown>
              <p className="text-[10px] text-slate-400">
                {format === "hex"
                  ? "Hexadecimal format: 0-9, A-F"
                  : "Base64 format: A-Z, a-z, 0-9, +, /"}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-linear-to-br from-slate-800/40 to-slate-700/20 rounded-xl p-4 border border-slate-600/30 backdrop-blur-sm mb-4">
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-300">
                Value
              </label>
              <VSCodeTextField
                className="w-full"
                value={value}
                // @ts-expect-error bcz
                onInput={(e: FormProps) => setValue(e.target.value)}
                placeholder="Enter key length (1-256)"
              />
              <p className="text-[10px] text-slate-400">
                Value of a string to be hashed in {format}
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
                {/* <VSCodeOption value="sha256">🔷 SHA-256</VSCodeOption>
                <VSCodeOption value="sha512">🔶 SHA-512</VSCodeOption> */}
                {SHA_ALGORITHAMS.map((item) => {
                  return (
                    <VSCodeOption value={item.value} key={item.value}>
                      {item.icon} {item.name}
                    </VSCodeOption>
                  );
                })}
              </VSCodeDropdown>
              {/* <p className="text-[10px] text-slate-400">
                {format === "hex"
                  ? "Hexadecimal format: 0-9, A-F"
                  : "Base64 format: A-Z, a-z, 0-9, +, /"}
              </p> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
