"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createModuleProxy = exports.OptionalDependencyNotInstalledError = void 0;
/**
 * Create a lazily-imported module proxy. This is useful for lazily requiring
 * optional dependencies.
 */
const createModuleProxy = getModule => {
  const holder = {
    module: undefined
  };
  const proxy = new Proxy(holder, {
    get: (target, property) => {
      if (property === '$$typeof') {
        return undefined;
      }
      if (target.module == null) {
        target.module = getModule();
      }
      return target.module[property];
    }
  });
  return proxy;
};
exports.createModuleProxy = createModuleProxy;
class OptionalDependencyNotInstalledError extends Error {
  constructor(name) {
    super(`${name} is not installed!`);
  }
}
exports.OptionalDependencyNotInstalledError = OptionalDependencyNotInstalledError;
//# sourceMappingURL=ModuleProxy.js.map