import { vscode } from "../hooks/global.hook";
import { PresetService } from "../services/presets";
import type { LevelPreset } from "../types";
import { validatePreset } from "../utils/validation";

type Props = {
  notification: {
    showNotification: (
      message: string,
      level: LevelPreset,
    ) => void;
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

    // Send message to extension
    vscode.postMessage(preset.message);
  };

  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
        Presets
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {PresetService.getAll().map((preset) => (
          <button
            key={preset.id}
            onClick={() => generatePreset(preset.id)}
            className={`group relative overflow-hidden px-2 py-1.5 rounded-lg font-medium text-xs transition-all duration-300 flex items-center justify-center gap-2
              ${preset.color} hover:${preset.hoverColor} 
              hover:shadow-lg hover:-translate-y-0.5
              border border-transparent hover:border-white/20
              active:translate-y-px
            `}
          >
            <img
              src={preset.icon}
              alt={preset.label}
              width={preset.iconSize.width}
              height={preset.iconSize.height}
              className="invert opacity-80 group-hover:opacity-100 transition-opacity"
            />
            <span className="text-white font-medium">{preset.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Presets;
