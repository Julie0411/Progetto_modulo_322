export const createStore = initialState => {
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
//# sourceMappingURL=storeBuilder.js.map