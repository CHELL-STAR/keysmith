import { useState } from "react";
import Header from "./components/Header";
import InputSection from "./components/InputSection";
import Actions from "./components/Actions";
import Output from "./components/Output";
import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";
import clockface from "./assets/images/clockface.svg";
import tools from "./assets/images/tools.svg";
import Presets from "./components/Presets";
import { useNotification } from "./hooks/useNotification";
import { useMessageListener } from "./hooks/useMessageListener";

export default function App() {
  const [length, setLength] = useState("32");
  const [format, setFormat] = useState("hex");
  const [output, setOutput] = useState("");
  const [quickTab, setQuickTab] = useState(true);

  // Use notification hook for centralized message/error state
  const notification = useNotification();

  // Setup message listener for webview messages from extension
  useMessageListener(setOutput);

  return (
    <div className="container p-2">
      <Header />
      <div className="flex items-center justify-between flex-wrap gap-2 my-2">
        <VSCodeButton
          appearance="secondary"
          className={`rounded-lg ${quickTab && "bg-emerald-700"}`}
          onClick={() => setQuickTab(true)}
        >
          <img
            src={clockface}
            alt="Quick Tab"
            className="invert-100 opacity-70 mr-2"
            width={14}
            height={14}
          />
          Quick
        </VSCodeButton>
        <VSCodeButton
          appearance="secondary"
          className={`rounded-lg ${!quickTab && "bg-emerald-700"}`}
          onClick={() => setQuickTab(false)}
        >
          <img
            src={tools}
            alt="Custom Tab"
            className="invert-100 opacity-70 mr-2"
            width={14}
            height={14}
          />
          Custom
        </VSCodeButton>
      </div>
      {quickTab ? (
        <>
          <Presets notification={notification} />
          <InputSection
            length={length}
            setLength={setLength}
            format={format}
            setFormat={setFormat}
          />
          <Actions
            length={length}
            format={format}
            output={output}
            notification={notification}
          />
        </>
      ) : (
        <p className="text-red-300 text-lg font-bold">
          Custom Tab. In Development!
        </p>
      )}
      <Output output={output} notification={notification} />
      {notification.message && (
        <div className={`status ${notification.isError ? "error" : "success"}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
}
