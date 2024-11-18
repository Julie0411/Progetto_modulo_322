"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReactNativeHapticFeedbackProxy = void 0;
var _ModuleProxy = require("./ModuleProxy");
const ReactNativeHapticFeedbackProxy = exports.ReactNativeHapticFeedbackProxy = (0, _ModuleProxy.createModuleProxy)(() => {
  try {
    return require('react-native-haptic-feedback');
  } catch (e) {
    throw new _ModuleProxy.OptionalDependencyNotInstalledError('react-native-haptic-feedback');
  }
});
//# sourceMappingURL=HapticProxy.js.map