import React, { createContext, useCallback, useContext, useEffect } from 'react';
import { useSyncExternalStoreWithSelector } from '../hooks/useSyncExternalStoreWithSelector';
import { createStore } from '../storeBuilder';
import { parseDateTime } from '../utils/dateUtils';
import useLazyRef from '../hooks/useLazyRef';
export const HighlightDatesContext = /*#__PURE__*/createContext(undefined);
const HighlightDatesProvider = ({
  children,
  highlightDates
}) => {
  const highlightDatesStore = useLazyRef(() => createStore({
    highlightDates: undefined
  })).current;
  useEffect(() => {
    highlightDatesStore.setState({
      highlightDates
    });
  }, [highlightDates, highlightDatesStore]);
  return /*#__PURE__*/React.createElement(HighlightDatesContext.Provider, {
    value: highlightDatesStore
  }, children);
};
export default HighlightDatesProvider;
export const useHighlightDates = date => {
  const highlightDatesContext = useContext(HighlightDatesContext);
  const selectorByDate = useCallback(state => {
    let data;
    if (!state.highlightDates) {
      return data;
    }
    const dateObj = parseDateTime(date);
    const weekDay = dateObj.weekday;
    const dateStr = dateObj.toFormat('yyyy-MM-dd');
    const highlightDatesWeekDay = state.highlightDates[weekDay];
    if (highlightDatesWeekDay) {
      data = highlightDatesWeekDay;
    }
    const highlightDatesByDate = state.highlightDates[dateStr];
    if (highlightDatesByDate) {
      data = highlightDatesByDate;
    }
    return data;
  }, [date]);
  if (!highlightDatesContext) {
    throw new Error('useRegionsByDate must be used within a HighlightDatesProvider');
  }
  const state = useSyncExternalStoreWithSelector(highlightDatesContext.subscribe, highlightDatesContext.getState, selectorByDate);
  return state;
};
//# sourceMappingURL=HighlightDatesProvider.js.map