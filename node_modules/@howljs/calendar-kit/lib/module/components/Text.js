function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from 'react';
import { Text as DefaultText, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeProvider';
const Text = ({
  style,
  allowFontScaling = false,
  ...props
}) => {
  const textColor = useTheme(state => state.colors.text);
  const defaultTextStyle = useTheme(state => state.textStyle);
  return /*#__PURE__*/React.createElement(DefaultText, _extends({}, props, {
    allowFontScaling: allowFontScaling,
    style: StyleSheet.flatten([{
      color: textColor
    }, defaultTextStyle, style])
  }));
};
export default Text;
//# sourceMappingURL=Text.js.map