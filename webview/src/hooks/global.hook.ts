// const deveApi = {
//      postMessage: (message: unknown) => {
//         return message
//      },
//      setState: (state: string) => {
//         return state;
//      },
//      getState: () => {
//         return ""
//      }
// }

// export const vscode = deveApi;
export const vscode = acquireVsCodeApi();