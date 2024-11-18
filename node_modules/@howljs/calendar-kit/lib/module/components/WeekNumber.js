import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { runOnJS, useAnimatedReaction } from 'react-native-reanimated';
import { useTheme } from '../context/ThemeProvider';
import { getWeekNumberOfYear } from '../utils/dateUtils';
import Text from './Text';
import { useTimezone } from '../context/TimeZoneProvider';
const WeekNumber = ({
  date
}) => {
  const {
    timeZone
  } = useTimezone();
  const theme = useTheme(useCallback(state => ({
    weekNumberBackgroundColor: state.colors.surface,
    weekNumber: state.weekNumber,
    weekNumberContainer: state.weekNumberContainer
  }), []));
  const [value, setValue] = useState('');
  const _getWeekNumber = newValue => {
    setValue(getWeekNumberOfYear(newValue, timeZone));
  };
  useAnimatedReaction(() => date.value, (newValue, prevValue) => {
    if (newValue !== prevValue) {
      runOnJS(_getWeekNumber)(newValue);
    }
  }, []);
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.container, {
      backgroundColor: theme.weekNumberBackgroundColor
    }, theme.weekNumberContainer]
  }, /*#__PURE__*/React.createElement(Text, {
    style: [styles.text, theme.weekNumber]
  }, value));
};
export default WeekNumber;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DADADA',
    marginHorizontal: 8,
    borderRadius: 4,
    marginTop: 8
  },
  text: {
    fontSize: 12,
    textAlign: 'center'
  }
});
//# sourceMappingURL=WeekNumber.js.map