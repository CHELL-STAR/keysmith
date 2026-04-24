import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";
import "@vscode/codicons/dist/codicon.css";

type EncodeHashProps = {
  encodeTab: boolean;
  setEncodeTab: (e: boolean) => void;
  setFormat: (e: string) => void;
};

type MainTabOptionsProps = {
  setQuickTab: (e: boolean) => void;
  quickTab: boolean;
};

const MainTabOptions = ({ quickTab, setQuickTab }: MainTabOptionsProps) => {
  return (
    <>
      <p className="context">Quick Presets</p>
      <div className="flex gap-2 mb-6 rounded-lg p-1 border border-native backdrop-blur-sm">
        <VSCodeButton
          onClick={() => setQuickTab(true)}
          // if it is custom tab change it background colour
          className={`rounded-md w-full text-xs transition-all duration-300
              ${!quickTab && "bg-(----vscode-button-foreground) text-(------vscode-button-background)"}
              
            `}
        >
          <span className="w-full flex items-center gap-2">
            <i className="codicon codicon-clockface"></i>
            Quick
          </span>
        </VSCodeButton>
        <VSCodeButton
          onClick={() => setQuickTab(false)}
          // if its quick tab change it background colour
          className={`rounded-md w-full text-xs transition-all duration-300
              ${quickTab && "bg-(----vscode-button-foreground) text-(------vscode-button-background)"}
            `}
        >
          <span className="w-full flex items-center gap-2">
            <i className="codicon codicon-tools"></i>
            Custom
          </span>
        </VSCodeButton>
      </div>
    </>
  );
};

const EncodeHash = ({
  encodeTab,
  setEncodeTab,
  setFormat,
}: EncodeHashProps) => {
  return (
    <div className="flex gap-2 mb-2 rounded-lg p-1 border border-native backdrop-blur-sm">
      <VSCodeButton
        onClick={() => {
          setEncodeTab(true);
          setFormat("hex");
        }}
        className={`rounded-md w-full font-medium text-xs transition-all duration-300
      ${!encodeTab && "bg-(----vscode-button-foreground) text-(------vscode-button-background)"}`}
      >
        <span className="w-full flex items-center gap-2">
          <i className="codicon codicon-symbol-class"></i>
          Encode
        </span>
      </VSCodeButton>

      <VSCodeButton
        onClick={() => {
          setEncodeTab(false);
          setFormat("sha256");
        }}
        className={`rounded-md w-full font-medium text-xs transition-all duration-300
      ${encodeTab && "bg-(----vscode-button-foreground) text-(------vscode-button-background)"}`}
      >
        <span className="w-full flex items-center gap-2">
          <i className="codicon codicon-symbol-numeric"></i>
          Hash
        </span>
      </VSCodeButton>
    </div>
  );
};

export { EncodeHash, MainTabOptions };
