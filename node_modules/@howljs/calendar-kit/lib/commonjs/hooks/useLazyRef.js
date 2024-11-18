"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
function useLazyRef(initializer) {
  const ref1 = (0, _react.useRef)(null);
  if (ref1.current === null) {
    ref1.current = initializer();
  }
  const ref2 = (0, _react.useRef)(ref1.current);
  return ref2;
}
var _default = exports.default = useLazyRef;
//# sourceMappingURL=useLazyRef.js.map