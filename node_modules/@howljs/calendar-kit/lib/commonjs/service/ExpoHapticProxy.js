"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExpoHapticProxy = void 0;
var _ModuleProxy = require("./ModuleProxy");
const ExpoHapticProxy = exports.ExpoHapticProxy = (0, _ModuleProxy.createModuleProxy)(() => {
  try {
    return require('expo-haptics');
  } catch (e) {
    throw new _ModuleProxy.OptionalDependencyNotInstalledError('expo-haptics');
  }
});
//# sourceMappingURL=ExpoHapticProxy.js.map