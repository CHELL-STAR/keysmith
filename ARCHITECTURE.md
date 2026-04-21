# Code Architecture & Refactoring Guide

## Overview
This document outlines the DRY (Don't Repeat Yourself) and SOLID principles applied to the Keysmith VS Code extension to improve code quality, maintainability, and extensibility.

---

## DRY Principle (Don't Repeat Yourself)

### What Was Improved

#### 1. **Validation Logic Extraction** (`utils/validation.ts`)
**Before:** Validation logic was duplicated across multiple components.
```typescript
// OLD - Repeated in Actions.tsx
if (!length) { setMessage("Length is required"); return; }
if (isNaN(num)) { setMessage("Length must be a number"); return; }
if (num < 1 || num > 256) { setMessage("Length must be between 1 and 256"); return; }
```

**After:** Centralized validation utility
```typescript
// NEW - Used everywhere
const validation = validateLength(length);
if (!validation.isValid) {
  notification.showError(validation.error!);
  return;
}
```

**Benefits:**
- Single source of truth for validation rules
- Easy to update validation logic in one place
- Reusable across all components

#### 2. **Clipboard Operations** (`utils/clipboard.ts`)
**Before:** Copy-to-clipboard logic was duplicated in `Actions.tsx` and `Output.tsx`
```typescript
// OLD - Repeated in multiple components
navigator.clipboard.writeText(output);
setMessage("Copied to clipboard");
setIsError(false);
```

**After:** Centralized clipboard utility with feedback
```typescript
// NEW - Single utility function
const result = await copyWithFeedback(output);
notification.showSuccess(result.message);
```

**Benefits:**
- Error handling in one place
- Async/await support
- Consistent feedback across app

#### 3. **Message State Management** (`hooks/useNotification.ts`)
**Before:** Message and error state were managed separately in components
```typescript
// OLD
const [message, setMessage] = useState("");
const [isError, setIsError] = useState(false);

// Manual cleanup needed everywhere
useEffect(() => {
  const timer = setTimeout(() => setMessage(""), 3000);
  return () => clearTimeout(timer);
}, [message]);
```

**After:** Custom hook encapsulates notification logic
```typescript
// NEW
const notification = useNotification();
notification.showSuccess("Message");
// Auto-cleanup handled by hook
```

**Benefits:**
- Consistent notification behavior
- Auto-cleanup with proper cleanup function
- Single responsibility

#### 4. **Preset Configuration** (`services/presets.ts`)
**Before:** Hardcoded switch statement with duplication
```typescript
// OLD - Hardcoded in Presets.tsx
switch (set) {
  case "jwt":
    vscode.postMessage({ type: "generate", length: 64, format: "base64" });
    setMessage("Jwt Secret Created successfully.");
    break;
  case "cookie":
    vscode.postMessage({ type: "generate", length: 32, format: "hex" });
    setMessage("Cookie Secret Created successfully.");
    break;
  // ... more hardcoded cases
}
```

**After:** Configuration-driven approach
```typescript
// NEW - Centralized config
const PRESETS: Record<string, PresetConfig> = {
  jwt: { id: "jwt", label: "JWT", icon: jwt, /* ... */ },
  cookie: { id: "cookie", label: "Cookie", icon: cookie, /* ... */ },
  // ...
};

// Reusable rendering
PresetService.getAll().map(preset => <button key={preset.id} />)
```

**Benefits:**
- Add new presets without changing component code
- Consistent preset structure
- Easy to test and maintain

#### 5. **Message Listener Hook** (`hooks/useMessageListener.ts`)
**Before:** Message listener setup duplicated in App.tsx
```typescript
// OLD - Hard to test, tight coupling
useEffect(() => {
  window.addEventListener("message", (event) => {
    if (event.data.type === "result") {
      setOutput(event.data.value);
    }
  });
}, []);
```

**After:** Extracted into custom hook
```typescript
// NEW - Reusable, testable, with proper cleanup
useMessageListener(setOutput);
```

---

## SOLID Principles

### 1. Single Responsibility Principle (SRP)

#### Extension Code Refactoring
**Before:** One class did everything
```typescript
// OLD - KeysmithViewProvider handled config, HTML loading, AND messages
class KeysmithViewProvider {
  resolveWebviewView() {
    webviewView.webview.options = { /* config */ };
    webviewView.webview.html = this.getHtml(webviewView.webview);
    webviewView.webview.onDidReceiveMessage((message) => {
      if (message.type === "generate") { /* handle */ }
      if (message.type === "uuid") { /* handle */ }
      if (message.type === "insert") { /* handle */ }
    });
  }
  getHtml() { /* complex HTML loading */ }
}
```

**After:** Separated concerns
```typescript
// NEW - Each class has ONE responsibility
// WebviewConfigService: Configure webview and load HTML
// MessageHandler: Process webview messages
// KeysmithViewProvider: Manage webview lifecycle only

class KeysmithViewProvider {
  resolveWebviewView() {
    WebviewConfigService.configureWebview(webviewView.webview, extensionUri);
    webviewView.webview.html = WebviewConfigService.getHtml(webviewView.webview, extensionUri);
    this.setupMessageHandler(webviewView);
  }
}
```

#### Component Refactoring
**Before:** Components mixed UI rendering with business logic
```typescript
// OLD - Actions.tsx mixed validation, clipboard, and UI
const generate = () => {
  if (!length) { setMessage("..."); return; }
  if (isNaN(num)) { setMessage("..."); return; }
  // ... more validation
  setIsError(false);
  setMessage("...");
  vscode.postMessage({ /* ... */ });
};
```

**After:** Components focus on UI, delegate logic to utilities
```typescript
// NEW - Actions.tsx focuses on rendering and user interaction
const generate = () => {
  const validation = validateLength(length);
  if (!validation.isValid) {
    notification.showError(validation.error!);
    return;
  }
  notification.showSuccess("...");
  vscode.postMessage(message);
};
```

### 2. Open/Closed Principle (OCP)

#### Preset System
**Before:** To add a new preset, you had to modify Presets.tsx
```typescript
// OLD - Need to modify component to add preset
// 1. Add button JSX
// 2. Add case in switch statement
// 3. Change is difficult and error-prone
```

**After:** Presets are configuration-driven
```typescript
// NEW - Add new preset without touching component code
// 1. Add entry to PRESETS config in presets.ts
// 2. Presets.tsx automatically renders new preset

// To add a new preset:
const PRESETS = {
  // ...existing presets
  oauth: {
    id: "oauth",
    label: "OAuth",
    icon: oauth,
    color: "bg-orange-800",
    hoverColor: "hover:bg-orange-600",
    successMessage: "OAuth Secret created",
    message: { type: "generate", length: 96, format: "base64" },
  },
};

// That's it! PresetService.getAll() will include it automatically
```

**Benefits:**
- New presets don't require code changes
- Reduced risk of breaking existing functionality
- Follows Plugin Architecture pattern

### 3. Liskov Substitution Principle (LSP)

#### Type Safety
**Created proper types** (`types/index.ts`) that ensure all message types are compatible:
```typescript
// NEW - Type system ensures compatibility
type VSCodeMessage = GenerateMessage | UUIDMessage | InsertMessage;

interface GenerateMessage {
  type: "generate";
  length: number;
  format: "hex" | "base64";
}

// Components and services can safely assume message structure
```

### 4. Interface Segregation Principle (ISI)

#### Notification Interface
**Before:** Components received multiple prop functions
```typescript
// OLD - Component needs to know about multiple state setters
<Presets setMessage={setMessage} setError={setIsError} />
```

**After:** Segregated interface for notification operations
```typescript
// NEW - Clean, focused interface
type NotificationApi = {
  showSuccess: (msg: string) => void;
  showError: (msg: string) => void;
  clear: () => void;
};

// Components only depend on what they need
<Presets notification={notification} />
```

### 5. Dependency Inversion Principle (DI)

#### Extension Message Handling
**Before:** Hardcoded dependencies
```typescript
// OLD - Tight coupling to VS Code API
resolveWebviewView(webviewView: vscode.WebviewView) {
  webviewView.webview.onDidReceiveMessage((message) => {
    if (message.type === "generate") {
      const secret = crypto.randomBytes(...);
      webviewView.webview.postMessage({ /* ... */ });
    }
  });
}
```

**After:** Injected dependencies
```typescript
// NEW - Depends on abstraction (MessageHandler service)
resolveWebviewView(webviewView: vscode.WebviewView) {
  webviewView.webview.onDidReceiveMessage((message) => {
    MessageHandler.handle(message, webviewView.webview, activeEditor);
  });
}

// MessageHandler is injected, can be tested independently
// Can be replaced with mock for testing
```

---

## Architecture Overview

### Folder Structure
```
src/
├── services/
│   ├── MessageHandler.ts      # Handles webview messages
│   └── WebviewConfigService.ts # Manages webview setup
├── extension.ts               # Extension entry point

webview/src/
├── services/
│   └── presets.ts            # Preset configurations (OCP)
├── utils/
│   ├── validation.ts         # Validation functions (DRY)
│   └── clipboard.ts          # Clipboard operations (DRY)
├── hooks/
│   ├── global.hook.ts        # VS Code API reference
│   ├── useNotification.ts    # Notification state (SRP)
│   └── useMessageListener.ts # Message listener hook (DRY)
├── types/
│   └── index.ts              # Shared type definitions
└── components/
    ├── App.tsx               # Main component
    ├── Actions.tsx           # Action buttons (uses utilities)
    ├── Presets.tsx           # Preset buttons (uses service)
    ├── Output.tsx            # Output display (uses utilities)
    ├── InputSection.tsx      # Input controls
    └── Header.tsx            # Header component
```

---

## Key Benefits

1. **Maintainability** - Easier to find and fix bugs
2. **Reusability** - Utilities and services used across components
3. **Testability** - Isolated functions and services are easy to test
4. **Scalability** - New features can be added without modifying existing code
5. **Extensibility** - Easy to add new presets, validations, or operations
6. **Code Quality** - Reduced duplication and complexity

---

## Future Improvements

### Phase 2 Recommendations

1. **Unit Tests**
   - Test validation functions in isolation
   - Test MessageHandler with mock vs Code API
   - Test PresetService configuration

2. **Error Handling**
   - Create centralized error handling service
   - Add error tracking/logging
   - Better error recovery

3. **Internationalization (i18n)**
   - Move all strings to i18n configuration
   - Support multiple languages

4. **Custom Presets**
   - Allow users to define custom presets
   - Persist custom presets to storage
   - Import/export preset configurations

5. **Performance Optimization**
   - Memoize component renders
   - Lazy load preset icons
   - Implement virtual scrolling for many presets

6. **Advanced Validation**
   - Create validator builder pattern
   - Support conditional validation
   - Custom validation rules

---

## Quick Reference: Design Patterns Used

| Pattern | Where | Purpose |
|---------|-------|---------|
| **Service Pattern** | MessageHandler, WebviewConfigService, PresetService | Centralize business logic |
| **Custom Hook Pattern** | useNotification, useMessageListener | Encapsulate stateful logic |
| **Configuration Pattern** | PRESETS object | Externalize configuration |
| **Utility Functions** | validation.ts, clipboard.ts | Reusable pure functions |
| **Factory Pattern** (implicit) | PresetService.getById() | Create objects by ID |
| **Observer Pattern** | useMessageListener | React to events |

---

## Migration Guide for New Features

### Adding a New Preset

1. **Add to `services/presets.ts`:**
   ```typescript
   const PRESETS = {
     // ... existing
     newPreset: {
       id: "newPreset",
       label: "New Preset",
       icon: newPresetIcon,
       color: "bg-color",
       hoverColor: "hover:bg-color",
       successMessage: "Message",
       message: { type: "generate", length: 32, format: "hex" },
     },
   };
   ```

2. **That's it!** Presets.tsx automatically renders it.

### Adding New Validation

1. **Add to `utils/validation.ts`:**
   ```typescript
   export function validateMyField(value: string): ValidationResult {
     // Your validation logic
     return { isValid: true };
   }
   ```

2. **Use in components:**
   ```typescript
   const result = validateMyField(value);
   if (!result.isValid) {
     notification.showError(result.error!);
   }
   ```

### Adding New Message Type

1. **Add to `types/index.ts`:**
   ```typescript
   export interface MyMessage {
     type: "myType";
     // Your properties
   }
   
   export type VSCodeMessage = /* add MyMessage to union */;
   ```

2. **Add handler to `services/MessageHandler.ts`:**
   ```typescript
   case "myType":
     this.handleMyType(message, webview);
     break;
   ```

3. **Send from webview component:**
   ```typescript
   vscode.postMessage({ type: "myType", /* properties */ });
   ```

---

## Conclusion

This refactoring applies industry-standard principles to create a more maintainable, scalable, and professional codebase. The separation of concerns, elimination of duplication, and adherence to SOLID principles make the extension easier to test, debug, and extend with new features.
