import React, { useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useActions } from '../context/ActionsProvider';
import { useHighlightDates } from '../context/HighlightDatesProvider';
import { useLocale } from '../context/LocaleProvider';
import { useNowIndicator } from '../context/NowIndicatorProvider';
import { useTheme } from '../context/ThemeProvider';
import { dateTimeToISOString, parseDateTime } from '../utils/dateUtils';
import Text from './Text';
const selectDayItemTheme = state => ({
  colors: state.colors,
  weekDayText: state.dayName,
  dayNumContainer: state.dayNumberContainer,
  dayNumText: state.dayNumber,
  todayName: state.todayName || {
    color: state.colors.text
  },
  todayNumberContainer: state.todayNumberContainer || {
    backgroundColor: state.colors.primary
  },
  todayNumber: state.todayNumber || {
    color: state.colors.onPrimary
  },
  dayContainer: state.dayContainer
});
const DayItem = ({
  dateUnix,
  children,
  showDayItem = true,
  dayItemContainerStyle
}) => {
  const {
    weekDayShort
  } = useLocale();
  const {
    currentDateUnix
  } = useNowIndicator();
  const {
    onPressDayNumber
  } = useActions();
  const highlightDates = useHighlightDates(dateUnix);
  const date = useMemo(() => parseDateTime(dateUnix), [dateUnix]);
  const {
    colors,
    weekDayText,
    dayNumContainer,
    dayNumText,
    todayName,
    todayNumberContainer,
    todayNumber,
    dayContainer
  } = useTheme(selectDayItemTheme);
  const isToday = dateUnix === currentDateUnix;
  const customStyle = useMemo(() => {
    let container = isToday ? todayNumberContainer : dayNumContainer;
    let dayText = isToday ? todayName : weekDayText;
    let numText = isToday ? todayNumber : dayNumText;
    if (highlightDates) {
      const isOverride = isToday && highlightDates.isTodayOverride;
      if (highlightDates && !isToday || isOverride) {
        container = (highlightDates === null || highlightDates === void 0 ? void 0 : highlightDates.dayNumberContainer) ?? container;
        dayText = (highlightDates === null || highlightDates === void 0 ? void 0 : highlightDates.dayName) ?? dayText;
        numText = (highlightDates === null || highlightDates === void 0 ? void 0 : highlightDates.dayNumber) ?? numText;
      }
    }
    return {
      container,
      dayText,
      numText
    };
  }, [highlightDates, dayNumContainer, dayNumText, isToday, todayName, todayNumber, todayNumberContainer, weekDayText]);
  const _onDayPress = () => {
    const dateStr = dateTimeToISOString(date);
    onPressDayNumber === null || onPressDayNumber === void 0 || onPressDayNumber(dateStr);
  };
  return /*#__PURE__*/React.createElement(View, {
    style: dayItemContainerStyle
  }, showDayItem && /*#__PURE__*/React.createElement(TouchableOpacity, {
    activeOpacity: 0.6,
    disabled: !onPressDayNumber,
    onPress: _onDayPress
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.dayContainer, dayContainer]
  }, /*#__PURE__*/React.createElement(Text, {
    style: [styles.weekDayText, {
      color: colors.text
    }, customStyle.dayText]
  }, weekDayShort[date.weekday % 7]), /*#__PURE__*/React.createElement(View, {
    style: [styles.dayNumContainer, customStyle.container]
  }, /*#__PURE__*/React.createElement(Text, {
    style: [styles.dayNumText, {
      color: colors.text
    }, customStyle.numText]
  }, date.day)))), children);
};
export default DayItem;
const styles = StyleSheet.create({
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  dayNumContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0)'
  },
  dayNumText: {
    fontSize: 16,
    fontWeight: '500'
  },
  weekDayText: {
    fontSize: 12,
    color: '#5F6267',
    marginBottom: 2
  }
});
//# sourceMappingURL=DayItem.js.map