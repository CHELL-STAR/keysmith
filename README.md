# Keysmith - Secret & Key Generator for VS Code

Generate secure secrets, API keys, tokens, and perform cryptographic operations directly inside VS Code. Keysmith is your all-in-one toolkit for creating and encoding sensitive data without leaving your editor.

[![VS Code Marketplace](https://img.shields.io/badge/VS%20Code-Marketplace-blue)](https://marketplace.visualstudio.com)
![Version](https://img.shields.io/badge/version-1.0.1-green)
![License](https://img.shields.io/badge/license-MIT-blue)

---

## Table of Contents

- [Preview](#preview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Quick Presets](#quick-presets)
  - [Secret Generation](#secret-generation)
  - [Encoding & Hashing](#encoding--hashing)
- [Screenshots](#screenshots)
- [How It Works](#how-it-works)
- [Technical Details](#technical-details)
- [Contributing](#contributing)
- [License](#license)

---

## Preview Image
![Main Interface](https://res.cloudinary.com/dgmxpcpv2/image/upload/v1776849530/main-interface_r4sxjp.png)

## Preview Video
<video src="https://res.cloudinary.com/dgmxpcpv2/video/upload/v1776848783/preview_oo4ina.mp4" width="100%" autoplay loop muted>
  Your browser does not support the video tag.
</video>

## Features

### 🚀 Quick Preset Generators
Generate pre-configured secrets with a single click:

- **JWT Secret** - 64-byte Base64 encoded secret for JSON Web Tokens
- **Cookie Secret** - 32-byte Hex encoded secret for secure cookies
- **API Secret** - 48-byte Base64 encoded secret for API authentication
- **UUID** - Generate universally unique identifiers

### 🔐 Custom Secret Generation
Create random secrets with full control:

- **Configurable Length** - Generate secrets from 1 to 256 bytes
- **Multiple Formats** - Choose between Hex and Base64 encoding
- **Live Preview** - See your secret before copying

### 📝 Encoding Operations
Transform your data:

- **Base64 Encoding** - Encode text to Base64 format
- **Hex Encoding** - Encode text to Hexadecimal format
- **One-way Transformation** - Perfect for data encoding needs

### #️⃣ Hashing Algorithms
Secure cryptographic hashing:

- **SHA-256** - Standard secure hashing (recommended)
- **SHA-384** - Extended security hash
- **SHA-512** - Maximum security hash
- **SHA-224** - Compact hash output
- **SHA-1** - Legacy algorithm (⚠️ use with caution)

### 💾 Easy Integration
- **Copy to Clipboard** - One-click copy with visual feedback
- **Insert at Cursor** - Directly insert generated secrets into your editor
- **Real-time Feedback** - Get instant notifications for all operations

### 🎨 Modern Interface
- Clean, intuitive UI built with React
- VS Code theme-aware design
- Responsive layout
- Dark mode optimized

---

## Installation

### From VS Code Extension Marketplace
1. Open VS Code
2. Go to **Extensions** (Ctrl+Shift+X / Cmd+Shift+X)
3. Search for "Keysmith"
4. Click **Install**

### Manual Installation (Development)
```bash
git clone <repository-url>
cd keysmith
npm install
npm run compile
```

---

## Usage

### Opening Keysmith

1. Click the **Keysmith icon** in the VS Code Activity Bar (left sidebar)
2. The Secret Generator panel opens on the right side

### Quick Presets

Click any preset button to instantly generate a secret:

```
┌─────────────────────────────┐
│ Presets                     │
├─────────────────────────────┤
│ [JWT] [Cookie] [API] [UUID] │
└─────────────────────────────┘
```

Each preset generates a secret with predefined:
- Length
- Encoding format
- Best practices for that secret type

### Secret Generation

**Step 1:** Set the key length (1-256 bytes)
```
Key Length: [32] bytes
```

**Step 2:** Choose encoding format
```
Format: [Hex ▼] or [Base64 ▼]
```

**Step 3:** Click "Generate" button
```
Output: a3f5e2c9b1d0a5c7f2e1a9b3d5c7e2f1
```

**Step 4:** Copy or Insert
```
[Copy to Clipboard] [Insert at Cursor]
```

### Encoding & Hashing

Switch to the encoding/hashing tab in the Input Section:

#### For Encoding:
1. Enter or paste your text
2. Select format (Base64 or Hex)
3. Click "Generate" to encode

#### For Hashing:
1. Enter or paste your text
2. Select SHA algorithm (SHA-256, SHA-384, SHA-512, SHA-224, SHA-1)
3. Click "Generate" to hash
4. View the hash output

## How It Works

### Architecture

Keysmith follows modern software design principles:

```
┌─────────────────────────────────────────┐
│         VS Code Extension               │
│  (extension.ts - Lifecycle Management)  │
└────────────────┬────────────────────────┘
                 │
        ┌────────┴────────┐
        ▼                 ▼
┌──────────────┐  ┌──────────────────┐
│  Webview     │  │ Message Handler  │
│  (React UI)  │  │  (Processing)    │
└──────────────┘  └──────────────────┘
```

### Data Flow

1. **User Interaction** - Click preset or generate button
2. **Validation** - Input validation (length, format, text)
3. **Message Dispatch** - Send message to extension backend
4. **Processing** - Generate secret/hash/encode (runs in Node.js)
5. **Result Return** - Send processed result back to webview
6. **UI Update** - Display result and show feedback notification
7. **User Action** - Copy to clipboard or insert at cursor

### Key Technologies

- **Frontend:** React, TypeScript, Tailwind CSS, VS Code UI Toolkit
- **Backend:** TypeScript, VS Code API
- **Build:** Vite (webview), TypeScript Compiler (extension)
- **Code Quality:** ESLint, TypeScript strict mode

---

## Technical Details

### Project Structure

```
keysmith/
├── src/                          # Extension (TypeScript)
│   ├── extension.ts              # Main extension entry point
│   ├── services/
│   │   ├── MessageHandler.ts     # Process messages from webview
│   │   └── WebviewConfigService.ts # Configure webview
│   └── constants/                # Configuration constants
│
├── webview/                      # UI (React + TypeScript)
│   ├── src/
│   │   ├── App.tsx               # Main React component
│   │   ├── components/           # UI components
│   │   ├── hooks/                # Custom React hooks
│   │   ├── services/             # Business logic
│   │   ├── utils/                # Utility functions
│   │   └── types/                # TypeScript types
│   └── vite.config.ts            # Vite build configuration
│
├── package.json                  # Root configuration
└── tsconfig.json                 # TypeScript configuration
```

### Code Quality

Keysmith follows industry best practices:

- **DRY Principle** - Reusable utilities and services
- **SOLID Principles** - Single responsibility, open/closed principle
- **Type Safety** - Full TypeScript strict mode
- **Error Handling** - Comprehensive input validation
- **Performance** - Optimized component rendering

### Dependencies

**Minimal and lightweight:**
- `@vscode/*` - Official VS Code APIs
- `react` - UI framework
- `typescript` - Type safety

No heavy external crypto libraries - uses Node.js built-in `crypto` module.

---

## Features Roadmap

- [ ] Custom tab for advanced settings
- [ ] History of generated secrets
- [ ] Bulk generation
- [ ] Encryption/Decryption utilities
- [ ] QR code generation
- [ ] Custom preset creation
- [ ] Export/Import configurations

---

## Performance

- **Instant Generation** - Cryptographic operations run in dedicated Node.js process
- **Zero Latency UI** - Responsive React UI with smooth animations
- **Minimal Bundle Size** - Optimized production build under 500KB
- **Memory Efficient** - Proper cleanup of resources

---

## Security Considerations

⚠️ **Important Notes:**

1. **Local Processing** - All operations run locally on your machine
2. **No Network** - Keysmith never sends data to external servers
3. **No Logging** - Generated secrets are not logged or stored
4. **Open Source** - Code is transparent and auditable
5. **Regular Updates** - Security patches are released promptly

**Best Practices:**
- Generated secrets should be stored securely (e.g., environment variables, secrets manager)
- Don't commit secrets to version control
- Use strong algorithms (SHA-256+)
- Rotate secrets regularly

---

## Troubleshooting

### Extension not showing up
- Ensure VS Code version is 1.116.0 or later
- Try reloading VS Code (Cmd/Ctrl + R)
- Check if extension is enabled in Extensions panel

### Copy to clipboard not working
- Check clipboard permissions
- Try using "Insert at Cursor" instead
- Restart VS Code

### Output not updating
- Refresh the panel (close and open again)
- Check browser console for errors (Help → Toggle Developer Tools)

---

## Development

### Build from Source

```bash
# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Watch mode for development
npm run watch

# Run linter
npm run lint

# Run tests
npm run test
```

### Debug Extension

1. Press `F5` to start debugging
2. A new VS Code window opens with Keysmith loaded
3. Set breakpoints and debug as normal

## Contributing

Contributions are welcome! Whether it's bug reports, feature requests, or code improvements:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure:
- Code follows ESLint rules (`npm run lint`)
- TypeScript compiles without errors
- Changes are well-documented
- Logic in existing files is not modified

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history and updates.

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Support

- **Issues & Bugs** - [GitHub Issues](https://github.com/yourusername/keysmith/issues)
- **Feature Requests** - [GitHub Discussions](https://github.com/yourusername/keysmith/discussions)
- **Documentation** - [Architecture Guide](./ARCHITECTURE.md)

---

## Acknowledgments

- Built with ❤️ for developers
- Inspired by the need for quick, secure secret generation
- Thanks to the VS Code extension community

---

## FAQ

### Can Keysmith generate cryptographically secure random data?
Yes! All generation uses Node.js's `crypto.randomBytes()` which is cryptographically secure.

### Is my data encrypted?
Generated secrets exist only in memory and your clipboard. They're not stored or transmitted.

### Can I disable certain generators?
Currently no, but custom configuration is coming in a future update.

### Does Keysmith work offline?
Yes! Completely offline. No internet connection required.

### Can I use Keysmith in production?
Absolutely. Many developers use Keysmith for generating production secrets securely.

---

**Made with ❤️ by the ULTRA PLUS**

*Questions or suggestions? We'd love to hear from you!*
