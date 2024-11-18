import { createModuleProxy, OptionalDependencyNotInstalledError } from './ModuleProxy';
export const ReactNativeHapticFeedbackProxy = createModuleProxy(() => {
  try {
    return require('react-native-haptic-feedback');
  } catch (e) {
    throw new OptionalDependencyNotInstalledError('react-native-haptic-feedback');
  }
});
//# sourceMappingURL=HapticProxy.js.map