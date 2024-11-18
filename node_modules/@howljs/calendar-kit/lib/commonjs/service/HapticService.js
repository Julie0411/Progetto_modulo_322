"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ExpoHapticProxy = require("./ExpoHapticProxy");
var _HapticProxy = require("./HapticProxy");
class HapticDependency {
  isReactNativeHapticFeedbackAvailable = false;
  isExpoHapticsAvailable = false;
  constructor() {
    try {
      if (_HapticProxy.ReactNativeHapticFeedbackProxy.default) {
        this.isReactNativeHapticFeedbackAvailable = true;
      }
    } catch (error) {}
    try {
      if (_ExpoHapticProxy.ExpoHapticProxy.ImpactFeedbackStyle !== undefined) {
        this.isExpoHapticsAvailable = true;
      }
    } catch (error) {
      // ExpoHapticProxy is not available
    }
  }
}
const hapticDependency = new HapticDependency();
class HapticService {
  isHapticFeedbackEnabled = false;
  useExpoHaptics = false;
  setEnabled(isEnabled) {
    if (isEnabled) {
      if (hapticDependency.isExpoHapticsAvailable) {
        this.useExpoHaptics = true;
      } else if (hapticDependency.isReactNativeHapticFeedbackAvailable) {
        this.useExpoHaptics = false;
      } else {
        throw new Error('No haptic feedback library available. Please install one of the following packages: expo-haptics or react-native-haptic-feedback');
      }
    }
    this.isHapticFeedbackEnabled = isEnabled;
  }
  impact() {
    if (!this.isHapticFeedbackEnabled) {
      return;
    }
    if (this.useExpoHaptics) {
      return _ExpoHapticProxy.ExpoHapticProxy.impactAsync(_ExpoHapticProxy.ExpoHapticProxy.ImpactFeedbackStyle.Medium);
    }
    return _HapticProxy.ReactNativeHapticFeedbackProxy.trigger('impactMedium', {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: true
    });
  }
  selection() {
    if (!this.isHapticFeedbackEnabled) {
      return;
    }
    if (this.useExpoHaptics) {
      return _ExpoHapticProxy.ExpoHapticProxy.selectionAsync();
    }
    return _HapticProxy.ReactNativeHapticFeedbackProxy.trigger('selection', {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: true
    });
  }
}
var _default = exports.default = HapticService;
//# sourceMappingURL=HapticService.js.map