"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _ThemeProvider = require("../context/ThemeProvider");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const Text = ({
  style,
  allowFontScaling = false,
  ...props
}) => {
  const textColor = (0, _ThemeProvider.useTheme)(state => state.colors.text);
  const defaultTextStyle = (0, _ThemeProvider.useTheme)(state => state.textStyle);
  return /*#__PURE__*/_react.default.createElement(_reactNative.Text, _extends({}, props, {
    allowFontScaling: allowFontScaling,
    style: _reactNative.StyleSheet.flatten([{
      color: textColor
    }, defaultTextStyle, style])
  }));
};
var _default = exports.default = Text;
//# sourceMappingURL=Text.js.map