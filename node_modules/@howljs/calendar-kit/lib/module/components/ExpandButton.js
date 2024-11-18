import React, { useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated';
import { useTheme } from '../context/ThemeProvider';
const ExpandButton = ({
  isExpanded,
  isShowExpandButton,
  containerStyle,
  renderExpandIcon
}) => {
  const borderColor = useTheme(useCallback(({
    colors
  }) => colors.border, []));
  const animStyle = useAnimatedStyle(() => {
    return {
      display: isShowExpandButton.value ? 'flex' : 'none'
    };
  });
  const iconRotate = useDerivedValue(() => {
    return withTiming(isExpanded.value ? 180 : 0, {
      duration: 350
    });
  });
  const expandIcon = useAnimatedStyle(() => {
    return {
      transform: [{
        rotate: `${iconRotate.value}deg`
      }]
    };
  });
  const toggleExpand = () => {
    isExpanded.value = !isExpanded.value;
  };
  const _renderExpandIcon = () => {
    if (renderExpandIcon) {
      return renderExpandIcon({
        isExpanded
      });
    }
    return /*#__PURE__*/React.createElement(Animated.View, {
      style: [styles.expandIcon, expandIcon]
    }, /*#__PURE__*/React.createElement(View, {
      style: [styles.chevron, styles.chevronLeft, {
        backgroundColor: borderColor
      }]
    }), /*#__PURE__*/React.createElement(View, {
      style: [styles.chevron, styles.chevronRight, {
        backgroundColor: borderColor
      }]
    }));
  };
  return /*#__PURE__*/React.createElement(Animated.View, {
    style: [styles.btnContainer, containerStyle, animStyle]
  }, /*#__PURE__*/React.createElement(TouchableOpacity, {
    hitSlop: 8,
    onPress: toggleExpand,
    activeOpacity: 0.6
  }, _renderExpandIcon()));
};
export default ExpandButton;
const styles = StyleSheet.create({
  btnContainer: {
    position: 'absolute',
    bottom: 5,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  expandIcon: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  chevron: {
    position: 'absolute',
    width: 11,
    height: 2,
    borderRadius: 3
  },
  chevronLeft: {
    left: 1,
    transform: [{
      rotate: '40deg'
    }]
  },
  chevronRight: {
    right: 1,
    transform: [{
      rotate: '-40deg'
    }]
  }
});
//# sourceMappingURL=ExpandButton.js.map