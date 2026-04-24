import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";
import { vscode } from "../hooks/global.hook";
import { PresetService } from "../services/presets";
import type { LevelPreset } from "../types";
import { validatePreset } from "../utils/validation";
import { useEffect, useRef, useState } from "react";

type Props = {
  notification: {
    showNotification: (message: string, level: LevelPreset) => void;
  };
};

/**
 * Presets Component
 * Single Responsibility: Renders and handles preset buttons
 * Open/Closed Principle: Uses PresetService to manage preset configurations
 * DRY: Eliminates hardcoded preset logic and configuration
 */
const Presets = ({ notification }: Props) => {
  /**
   * Generate preset secret
   */
  const generatePreset = (presetId: string) => {
    // Validate preset
    const validation = validatePreset(presetId);
    if (!validation.isValid) {
      notification.showNotification(validation.error!, "error");
      return;
    }

    // Get preset configuration from service (OCP: easy to add new presets)
    const preset = PresetService.getById(presetId);
    if (!preset) {
      notification.showNotification("Preset not found", "error");
      return;
    }

    setActivePreset(preset.id);

    // Send message to extension
    vscode.postMessage(preset.message);
  };

  const [activePreset, setActivePreset] = useState<string | null>(null);
  const presetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        presetRef.current &&
        !presetRef.current.contains(event.target as Node)
      ) {
        setActivePreset(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="mb-6">
      <p className="context mb-2">Auto Services</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2" ref={presetRef}>
        {PresetService.getAll().map((preset) => (
          <VSCodeButton
            key={preset.id}
            onClick={() => generatePreset(preset.id)}
            className={`group preset w-full relative overflow-hidden rounded-lg font-medium text-xs transition-all duration-300
             ${activePreset === preset.id && "active"}
            `}
          >
            <span className="w-full flex items-center gap-2">
              <i className={`codicon ${preset.icon}`} />
              <span className="font-medium">{preset.label}</span>
            </span>
          </VSCodeButton>
        ))}
      </div>
    </div>
  );
};

export default Presets;
