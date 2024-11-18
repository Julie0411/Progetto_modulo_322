"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useLatestCallback;
var _react = require("react");
function useLatestCallback(callback) {
  const ref = (0, _react.useRef)(callback);
  const latestCallback = (0, _react.useRef)(function latestCallback(...args) {
    if (typeof ref.current !== 'function') {
      console.warn('Should reload app to update callback');
      return;
    }
    const refCallback = ref.current;
    return refCallback.apply(this, args);
  }).current;
  (0, _react.useLayoutEffect)(() => {
    ref.current = callback;
  });
  return callback ? latestCallback : callback;
}
//# sourceMappingURL=useLatestCallback.js.map