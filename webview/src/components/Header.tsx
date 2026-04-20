export default function Header() {
  return (
    <header className="flex items-center gap-2 border-b border-(--vscode-panel-border) pb-2 mb-1">
      <span className="codicon codicon-key text-(--vscode-symbolIcon-propertyForeground)"></span>
      <h3 className="text-[11px] uppercase tracking-wider font-semibold opacity-80 m-0">
        Keysmith
      </h3>
    </header>
  );
}
