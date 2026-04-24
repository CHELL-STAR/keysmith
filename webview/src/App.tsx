import { useState } from "react";
import InputSection from "./components/InputSection";
import Actions from "./components/Actions";
import Output from "./components/Output";

import Presets from "./components/Presets";
import { useNotification } from "./hooks/useNotification";
import { useMessageListener } from "./hooks/useMessageListener";
import { MainTabOptions } from "./components/Tabs";


export default function App() {
  const [length, setLength] = useState("32");
  const [format, setFormat] = useState("hex");
  const [output, setOutput] = useState("");
  const [quickTab, setQuickTab] = useState(true);
  const [hashvalue, setHashValue] = useState("");

  const notification = useNotification();

  useMessageListener({
    onResult: setOutput,
  });

  return (
    <div className="min-h-screen w-screen flex items-start">
      <div className="container max-w-md px-4 py-6 relative z-10">
        <MainTabOptions quickTab={quickTab} setQuickTab={setQuickTab} />

        {quickTab ? (
          <div className="space-y-4">
            <Presets notification={notification} />

            <InputSection
              length={length}
              setLength={setLength}
              format={format}
              setFormat={setFormat}
              setValue={setHashValue}
              value={hashvalue}
            />
            <Actions
              length={length}
              format={format}
              output={output}
              notification={notification}
              value={hashvalue}
            />
          </div>
        ) : (
          <div className="bg-linear-to-br card rounded-xl p-8 border border-native backdrop-blur-sm text-center">
            <p className="opacity-80 text-sm">
              ⚙️ Custom Tab is in development
            </p>
            <p className="opacity-70 text-xs mt-2">
              More features coming soon...
            </p>
          </div>
        )}

        <Output output={output} notification={notification} />

        {notification.message && (
          <div
            className={`fixed bottom-4 left-4 right-4 px-4 py-3 rounded-lg text-xs flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-300 ${
              notification.isError
                ? "bg-red-800 text-white border border-red-600/50"
                : "bg-emerald-800 text-white border border-emerald-600/50"
            }`}
          >
            <i className={`codicon ${notification.isError ? "codicon-error" : "codicon-pass"}`}></i>
            {notification.message}
          </div>
        )}
      </div>
    </div>
  );
}
