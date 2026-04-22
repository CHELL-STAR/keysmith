import encode from "../assets/images/encode.svg";
import hashImg from "../assets/images/hash.svg";
import clockface from "../assets/images/clockface.svg";
import tools from "../assets/images/tools.svg";

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
    <div className="flex gap-2 mb-6 rounded-lg p-1 border border-slate-600/30 backdrop-blur-sm">
      <button
        onClick={() => setQuickTab(true)}
        className={`flex-1 px-2 py-1.5 rounded-md font-medium text-xs transition-all duration-300 flex items-center justify-center gap-2
              ${
                quickTab
                  ? "bg-white text-black"
                  : "text-slate-400 hover:text-slate-300"
              }
              
            `}
      >
        <img
          src={clockface}
          alt="Quick"
          className={`w-3 h-3 ${quickTab ? "brightness-100" : "invert opacity-70"}`}
        />
        Quick
      </button>
      <button
        onClick={() => setQuickTab(false)}
        className={`flex-1 px-2 py-1.5 rounded-md font-medium text-xs transition-all duration-300 flex items-center justify-center gap-2
              ${
                !quickTab
                  ? "bg-white text-black"
                  : "text-slate-400 hover:text-slate-300"
              }
            `}
      >
        <img
          src={tools}
          alt="Custom"
          className={`w-3 h-3 ${!quickTab ? "brightness-100" : "invert opacity-70"}`}
        />
        Custom
      </button>
    </div>
  );
};

const EncodeHash = ({
  encodeTab,
  setEncodeTab,
  setFormat,
}: EncodeHashProps) => {
  return (
    <div className="flex gap-2 mb-6 rounded-lg p-1 border border-zinc-600/30 backdrop-blur-sm">
      <button
        onClick={() => {
          setEncodeTab(true);
          setFormat("hex");
        }}
        className={`flex-1 px-2 py-1.5 rounded-md font-medium text-xs transition-all duration-300 flex items-center justify-center gap-2
      ${encodeTab ? "bg-white text-black" : "text-slate-400 hover:text-slate-300"}`}
      >
        <img
          src={encode}
          alt="Encode Tab"
          /* If encodeTab is true (white bg), we use invert to make the icon dark.
         If false, we keep it original or slightly dimmed.
      */
          className={`w-3 h-3 transition-all duration-300 ${
            encodeTab ? "brightness-100" : "invert opacity-70"
          }`}
        />
        Encode
      </button>

      <button
        onClick={() => {
          setEncodeTab(false);
          setFormat("sha256");
        }}
        className={`flex-1 px-2 py-1.5 rounded-md font-medium text-xs transition-all duration-300 flex items-center justify-center gap-2
      ${!encodeTab ? "bg-white text-black" : "text-slate-400 hover:text-slate-300"}`}
      >
        <img
          src={hashImg}
          alt="Hash Tab"
          className={`w-3 h-3 transition-all duration-300 ${
            !encodeTab ? "brightness-100" : "invert opacity-70"
          }`}
        />
        Hash
      </button>
    </div>
  );
};

export { EncodeHash, MainTabOptions };
