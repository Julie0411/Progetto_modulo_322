"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStore = void 0;
const createStore = initialState => {
  let state = initialState;
  const listeners = new Set();
  const getState = () => state;
  const setState = newState => {
    state = newState;
    for (const listener of listeners) {
      listener();
    }
  };
  const subscribe = listener => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  return {
    getState,
    setState,
    subscribe
  };
};
exports.createStore = createStore;
//# sourceMappingURL=storeBuilder.js.map