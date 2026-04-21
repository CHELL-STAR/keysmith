import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

/**
 * Service for managing webview configuration and HTML loading
 * Single Responsibility: Handles all webview setup
 */
export class WebviewConfigService {
  /**
   * Configure webview options
   */
  static configureWebview(
    webview: vscode.Webview,
    extensionUri: vscode.Uri
  ): void {
    webview.options = {
      enableScripts: true,
      localResourceRoots: [
        vscode.Uri.joinPath(extensionUri, "webview", "dist"),
      ],
    };
  }

  /**
   * Load and process HTML file with URI replacements
   */
  static getHtml(
    webview: vscode.Webview,
    extensionUri: vscode.Uri
  ): string {
    const distPath = vscode.Uri.joinPath(extensionUri, "webview", "dist");
    const indexPath = vscode.Uri.joinPath(distPath, "index.html");

    try {
      let html = fs.readFileSync(indexPath.fsPath, "utf-8");

      // Replace relative paths with webview URIs
      html = this.replaceResourcePaths(html, webview, distPath);

      return html;
    } catch (error) {
      console.error("Error loading HTML:", error);
      return this.getErrorHtml();
    }
  }

  /**
   * Replace resource paths in HTML with webview URIs
   */
  private static replaceResourcePaths(
    html: string,
    webview: vscode.Webview,
    distPath: vscode.Uri
  ): string {
    return html.replace(
      /(src|href)="([^"]+)"/g,
      (match: string, attr: string, resourcePath: string) => {
        // Skip external resources
        if (resourcePath.startsWith("http")) {
          return match;
        }

        const resourceUri = webview.asWebviewUri(
          vscode.Uri.joinPath(distPath, resourcePath)
        );

        return `${attr}="${resourceUri}"`;
      }
    );
  }

  /**
   * Return error HTML when loading fails
   */
  private static getErrorHtml(): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; color: #ff6b6b; }
            h1 { color: #ff6b6b; }
          </style>
        </head>
        <body>
          <h1>Error</h1>
          <p>Failed to load the extension. Please reload the window.</p>
        </body>
      </html>
    `;
  }
}
