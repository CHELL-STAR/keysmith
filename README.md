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
- [How It Works](#how-it-works)
- [Technical Details](#technical-details)

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

## Installation

### From VS Code Extension Marketplace
1. Open VS Code
2. Go to **Extensions** (Ctrl+Shift+X / Cmd+Shift+X)
3. Search for "Keysmith"
4. Click **Install**

### Manual Installation (Development)
```bash
git clone https://github.com/CHELL-STAR/keysmith.git
cd keysmith
npm install
npm run build
```
The build script compiles both the extension and webview code.

See package.json for additional script details.
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

### Dependencies

**Minimal and lightweight:**
- `@vscode/*` - Official VS Code APIs
- `react` - UI framework
- `typescript` - Type safety

No heavy external crypto libraries - uses Node.js built-in `crypto` module.

---

## Features Roadmap

- [ ] Custom tab for advanced settings
- [ ] Bulk generation
- [ ] Encryption/Decryption utilities
- [ ] QR code generation
- [ ] Custom preset creation
- [ ] Export/Import configurations

---

## Security Considerations

⚠️ **Important Notes:**

1. **Local Processing** - All operations run locally on your machine
2. **No Network** - Keysmith never sends data to external servers
3. **No Logging** - Generated secrets are not logged or stored


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

**Made with ❤️ by the CHELL STAR**

*Questions or suggestions? We'd love to hear from you!*
