import key from "../assets/images/key.svg"


export default function Header() {
  return (
    <header className="flex items-center gap-2 border-b border-(--vscode-panel-border) pb-2 mb-1">
      <img src={key} alt="key" className="invert-100 opacity-70" width={14} height={14} />
      <h3 className="text-[11px] uppercase tracking-wider font-semibold opacity-80 m-0">
        Keysmith
      </h3>
    </header>
  );
}
