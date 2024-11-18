import { createModuleProxy, OptionalDependencyNotInstalledError } from './ModuleProxy';
export const ExpoHapticProxy = createModuleProxy(() => {
  try {
    return require('expo-haptics');
  } catch (e) {
    throw new OptionalDependencyNotInstalledError('expo-haptics');
  }
});
//# sourceMappingURL=ExpoHapticProxy.js.map