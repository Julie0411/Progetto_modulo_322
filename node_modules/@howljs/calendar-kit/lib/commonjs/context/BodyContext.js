"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useBody = exports.BodyContext = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const BodyContext = exports.BodyContext = /*#__PURE__*/_react.default.createContext(undefined);
const useBody = () => {
  const context = _react.default.useContext(BodyContext);
  if (context === undefined) {
    throw new Error('BodyContext is not available');
  }
  return context;
};
exports.useBody = useBody;
//# sourceMappingURL=BodyContext.js.map