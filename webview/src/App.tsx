import { useEffect, useState } from "react";
import Header from "./components/Header";
import InputSection from "./components/InputSection";
import Actions from "./components/Actions";
import Output from "./components/Output";
import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";
import clockface from "./assets/images/clockface.svg";
import tools from "./assets/images/tools.svg";
import Presets from "./components/Presets";

export default function App() {
  const [length, setLength] = useState("32");
  const [format, setFormat] = useState("hex");
  const [output, setOutput] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [quickTab, setQuickTab] = useState(true);

  useEffect(() => {
    window.addEventListener("message", (event) => {
      if (event.data.type === "result") {
        setOutput(event.data.value);
      }
    });
  }, []);

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

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
          <Presets setMessage={setMessage} setError={setIsError} />
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
            setMessage={setMessage}
            setIsError={setIsError}
          />
        </>
      ) : (
        <p className="text-red-300 text-lg font-bold">
          Custom Tab. In Development!
        </p>
      )}
      <Output output={output} setIsError={setIsError} setMessage={setMessage} />
      {message && (
        <div className={`status ${isError ? "error" : "success"}`}>
          {message}
        </div>
      )}
    </div>
  );
}
