/**
 * Create a lazily-imported module proxy. This is useful for lazily requiring
 * optional dependencies.
 */
export const createModuleProxy = getModule => {
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
export class OptionalDependencyNotInstalledError extends Error {
  constructor(name) {
    super(`${name} is not installed!`);
  }
}
//# sourceMappingURL=ModuleProxy.js.map