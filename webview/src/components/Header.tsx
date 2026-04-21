import key from "../assets/images/key.svg"

export default function Header() {
  return (
    <header className="mb-6 pt-2">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg shadow-lg">
          <img src={key} alt="key" className="w-5 h-5 invert" />
        </div>
        <div>
          <h1 className="text-xl font-bold">
            Keysmith
          </h1>
          <p className="text-[11px] opacity-60 font-medium">
            Generate secrets with ease
          </p>
        </div>
      </div>
    </header>
  );
}
