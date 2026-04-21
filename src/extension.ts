import * as vscode from "vscode";
import { MessageHandler } from "./services/MessageHandler";
import { WebviewConfigService } from "./services/WebviewConfigService";

/**
 * Activate the extension
 */
export function activate(context: vscode.ExtensionContext) {
  const provider = new KeysmithViewProvider(context);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider("keysmithView", provider)
  );
}

/**
 * Keysmith View Provider
 * Implements Single Responsibility: Only manages webview lifecycle
 */
class KeysmithViewProvider implements vscode.WebviewViewProvider {
  constructor(private context: vscode.ExtensionContext) {}

  /**
   * Resolve webview view and setup message handlers
   */
  resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    token: vscode.CancellationToken
  ): void {
    // Configure webview (delegated to service)
    WebviewConfigService.configureWebview(
      webviewView.webview,
      this.context.extensionUri
    );

    // Load HTML (delegated to service)
    webviewView.webview.html = WebviewConfigService.getHtml(
      webviewView.webview,
      this.context.extensionUri
    );

    // Setup message handler
    this.setupMessageHandler(webviewView);
  }

  /**
   * Setup message handler for webview messages
   * Single Responsibility: Manages message event listeners
   */
  private setupMessageHandler(webviewView: vscode.WebviewView): void {
    const disposable = webviewView.webview.onDidReceiveMessage((message) => {
      MessageHandler.handle(
        message,
        webviewView.webview,
        vscode.window.activeTextEditor
      );
    });

    // Ensure disposable is cleaned up when view is disposed
    webviewView.onDidDispose(() => {
      disposable.dispose();
    });
  }
}

/**
 * Deactivate the extension
 */
export function deactivate() {}
