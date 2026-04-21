import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";
import { vscode } from "../hooks/global.hook";
import { PresetService } from "../services/presets";
import { validatePreset } from "../utils/validation";

type Props = {
  notification: {
    showSuccess: (msg: string) => void;
    showError: (msg: string) => void;
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
      notification.showError(validation.error!);
      return;
    }

    // Get preset configuration from service (OCP: easy to add new presets)
    const preset = PresetService.getById(presetId);
    if (!preset) {
      notification.showError("Preset not found");
      return;
    }

    // Send message to extension
    vscode.postMessage(preset.message);

    // Show success message
    notification.showSuccess(preset.successMessage);
  };

  return (
    <div className="my-2">
      <label>Presets</label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {PresetService.getAll().map((preset) => (
          <VSCodeButton
            key={preset.id}
            appearance="primary"
            className={`${preset.color} text-white rounded-lg ${preset.hoverColor} transition-all duration-300`}
            onClick={() => generatePreset(preset.id)}
          >
            <img
              src={preset.icon}
              alt={preset.label}
              className="invert-100 opacity-70 mr-2"
              width={14}
              height={14}
            />
            {preset.label}
          </VSCodeButton>
        ))}
      </div>
    </div>
  );
};

export default Presets;
