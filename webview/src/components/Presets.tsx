import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";
import jwt from "../assets/images/jsonwebtokens.svg";
import api from "../assets/images/api-settings.svg";
import cookie from "../assets/images/cookie.svg";
import uuid from "../assets/images/uuid-backfill.svg";
// import { useEffect, useState } from "react";
import { vscode } from "../hooks/global.hook";

type Props = {
  setMessage: (msg: string) => void;
  setError: (val: boolean) => void;
};
const Presets = ({ setError, setMessage }: Props) => {
//   const [preset, setPreset] = useState("");

//   useEffect(() => {
    
//   }, [preset, setMessage, setError]);

  function generatePreset(set: string) {
    if (set && set.trim().length > 0) {
      setMessage("");
      setError(false);
      switch (set) {
        case "jwt":
          vscode.postMessage({
            type: "generate",
            length: 64,
            format: "base64",
          });
          setMessage("Jwt Secret Created successfully.");
          break;
        case "cookie":
          vscode.postMessage({ type: "generate", length: 32, format: "hex" });
          setMessage("Cookie Secret Created successfully.");
          break;
        case "api":
          vscode.postMessage({
            type: "generate",
            length: 48,
            format: "base64",
          });
          setMessage("Api Secret Created successfully.");
          break;
        case "uuid":
          vscode.postMessage({ type: "uuid" });
          setMessage("UUID Created successfully.");
          break;
        default:
          setError(true);
          setMessage("No Preset Found!");
      }
    }

    set = "";
  }

  return (
    <div className="my-2">
      <label>Presets</label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        <VSCodeButton
          appearance="primary"
          className="bg-blue-800 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
          onClick={() => generatePreset("jwt")}
        >
          <img
            src={jwt}
            alt="jwt"
            className="invert-100 opacity-70 mr-2"
            width={14}
            height={14}
          />{" "}
          JWT
        </VSCodeButton>
        <VSCodeButton
          appearance="primary"
          className="bg-emerald-800 text-white rounded-lg hover:bg-emerald-600 transition-all duration-300"
          onClick={() => generatePreset("cookie")}
        >
          <img
            src={cookie}
            alt="cookie"
            className="invert-100 opacity-70 mr-2"
            width={14}
            height={14}
          />
          Cookie
        </VSCodeButton>
        <VSCodeButton
          appearance="primary"
          className="bg-red-800 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
          onClick={() => generatePreset("api")}
        >
          <img
            src={api}
            alt="Api Key"
            className="invert-100 opacity-70 mr-2"
            width={18}
            height={18}
          />
          API Key
        </VSCodeButton>
        <VSCodeButton
          appearance="primary"
          className="bg-purple-800 text-white rounded-lg hover:bg-purple-600 transition-all duration-300"
          onClick={() => generatePreset("uuid")}
        >
          <img
            src={uuid}
            alt="UUID"
            className="invert-100 opacity-70 mr-2"
            width={14}
            height={14}
          />
          UUID
        </VSCodeButton>
      </div>
    </div>
  );
};

export default Presets;
