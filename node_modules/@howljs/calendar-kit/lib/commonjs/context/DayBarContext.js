"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useHeader = exports.HeaderContext = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const HeaderContext = exports.HeaderContext = /*#__PURE__*/_react.default.createContext(undefined);
const useHeader = () => {
  const context = _react.default.useContext(HeaderContext);
  if (context === undefined) {
    throw new Error('DayBarContext is not available');
  }
  return context;
};
exports.useHeader = useHeader;
//# sourceMappingURL=DayBarContext.js.map