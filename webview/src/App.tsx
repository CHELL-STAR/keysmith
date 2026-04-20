import { useEffect, useState } from "react";
import Header from "./components/Header";
import InputSection from "./components/InputSection";
import Actions from "./components/Actions";
import Output from "./components/Output";

export default function App() {
  const [length, setLength] = useState("32");
  const [format, setFormat] = useState("hex");
  const [output, setOutput] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

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
      <Output output={output} />
      {message && (
        <div className={`status ${isError ? "error" : "success"}`}>
          {message}
        </div>
      )}
    </div>
  );
}
