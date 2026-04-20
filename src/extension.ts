import * as vscode from "vscode";
import * as crypto from "crypto";

export function activate(context: vscode.ExtensionContext) {
  const provider = new KeysmithViewProvider(context);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider("keysmithView", provider),
  );
}

class KeysmithViewProvider implements vscode.WebviewViewProvider {
  constructor(private context: vscode.ExtensionContext) {}

  resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    token: vscode.CancellationToken,
  ): void {
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [
        vscode.Uri.joinPath(this.context.extensionUri, "webview", "dist"),
      ],
    };

    webviewView.webview.html = this.getHtml(webviewView.webview);

    webviewView.webview.onDidReceiveMessage((message) => {
      if (message.type === "generate") {
        const secret = crypto
          .randomBytes(message.length)
          .toString(message.format);

        webviewView.webview.postMessage({
          type: "result",
          value: secret,
        });
      }

      if (message.type === "insert") {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
          editor.edit((editBuilder) => {
            editBuilder.insert(editor.selection.active, message.value);
          });
        }
      }
    });
  }

  getHtml(webview: vscode.Webview): string {
    const distPath = vscode.Uri.joinPath(
      this.context.extensionUri,
      "webview",
      "dist",
    );

    const indexPath = vscode.Uri.joinPath(distPath, "index.html");

    let html = require("fs").readFileSync(indexPath.fsPath, "utf-8");

    // Replace ALL asset paths properly
    html = html.replace(
      /(src|href)="([^"]+)"/g,
      (match: string, attr: string, path: string) => {
        if (path.startsWith("http")) {
          return match;
        }

        const resourceUri = webview.asWebviewUri(
          vscode.Uri.joinPath(distPath, path),
        );

        return `${attr}="${resourceUri}"`;
      },
    );

    return html;
  }
}

export function deactivate() {}
