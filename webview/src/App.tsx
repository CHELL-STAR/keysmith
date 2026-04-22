import { useState } from "react";
import Header from "./components/Header";
import InputSection from "./components/InputSection";
import Actions from "./components/Actions";
import Output from "./components/Output";

import Presets from "./components/Presets";
import { useNotification } from "./hooks/useNotification";
import { useMessageListener } from "./hooks/useMessageListener";
import error from "./assets/images/error.svg";
import success from "./assets/images/pass.svg";
import { MainTabOptions } from "./components/Tabs";

export default function App() {
  const [length, setLength] = useState("32");
  const [format, setFormat] = useState("hex");
  const [output, setOutput] = useState("");
  const [quickTab, setQuickTab] = useState(true);
  const [hashvalue, setHashValue] = useState("");

  // Use notification hook for centralized message/error state
  const notification = useNotification();

  // Setup message listener for webview messages from extension
  useMessageListener({
    onResult: setOutput,
    onNotification: notification.showNotification
  });

  return (
    <div className="min-h-screen">
      {/* Content */}
      <div className="container mx-auto max-w-md px-4 py-6 relative z-10">
        <Header />

        {/* Tab Navigation */}
        <MainTabOptions quickTab={quickTab} setQuickTab={setQuickTab} />

        {/* Tab Content */}
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
          <div className="bg-linear-to-br from-slate-800/40 to-slate-700/20 rounded-xl p-8 border border-slate-600/30 backdrop-blur-sm text-center">
            <p className="text-slate-400 text-sm">
              ⚙️ Custom Tab is in development
            </p>
            <p className="text-slate-500 text-xs mt-2">
              More features coming soon...
            </p>
          </div>
        )}

        {/* Output Section */}
        <Output output={output} notification={notification} />

        {/* Notification Toast */}
        {notification.message && (
          <div
            className={`fixed bottom-4 left-4 right-4 px-4 py-3 rounded-lg font-medium text-sm flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-300 ${
              notification.isError
                ? "bg-red-800 text-white border border-red-600/50"
                : "bg-emerald-800 text-white border border-emerald-600/50"
            }`}
          >
            <img
              src={notification.isError ? error : success}
              className="invert"
              width={16}
              height={16}
            />
            {notification.message}
          </div>
        )}
      </div>
    </div>
  );
}
