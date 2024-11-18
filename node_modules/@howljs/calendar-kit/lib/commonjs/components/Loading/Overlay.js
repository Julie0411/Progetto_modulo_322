"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _LoadingContext = require("../../context/LoadingContext");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const LoadingOverlay = () => {
  const isLoading = (0, _LoadingContext.useLoading)();
  if (!isLoading) {
    return null;
  }
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [_reactNative.StyleSheet.absoluteFill, styles.container]
  });
};
var _default = exports.default = LoadingOverlay;
const styles = _reactNative.StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0)'
  }
});
//# sourceMappingURL=Overlay.js.map