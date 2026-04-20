declare function acquireVsCodeApi(): {
  postMessage: (message: unknown) => void;
  setState: (state: string) => void;
  getState: () => string;
};