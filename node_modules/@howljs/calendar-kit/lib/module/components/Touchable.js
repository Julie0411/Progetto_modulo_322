function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from 'react';
import { TouchableOpacity } from 'react-native';
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
  return /*#__PURE__*/React.createElement(TouchableOpacity, _extends({}, props, {
    activeOpacity: 1,
    onPress: onPress ? handlePress : undefined,
    onLongPress: onLongPress ? handleLongPress : undefined
  }), children);
};
export default Touchable;
//# sourceMappingURL=Touchable.js.map