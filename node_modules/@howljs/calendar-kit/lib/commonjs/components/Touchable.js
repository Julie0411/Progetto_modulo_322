"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const Touchable = ({
  children,
  onPress,
  onLongPress,
  ...props
}) => {
  const handlePress = e => {
    const event = {
      ...e,
      nativeEvent: {
        ...e.nativeEvent,
        locationX: e.nativeEvent.locationX || e.nativeEvent.offsetX,
        locationY: e.nativeEvent.locationY || e.nativeEvent.offsetY
      }
    };
    onPress === null || onPress === void 0 || onPress(event);
  };
  const handleLongPress = e => {
    const event = {
      ...e,
      nativeEvent: {
        ...e.nativeEvent,
        locationX: e.nativeEvent.locationX || e.nativeEvent.offsetX,
        locationY: e.nativeEvent.locationY || e.nativeEvent.offsetY
      }
    };
    onLongPress === null || onLongPress === void 0 || onLongPress(event);
  };
  return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, _extends({}, props, {
    activeOpacity: 1,
    onPress: onPress ? handlePress : undefined,
    onLongPress: onLongPress ? handleLongPress : undefined
  }), children);
};
var _default = exports.default = Touchable;
//# sourceMappingURL=Touchable.js.map