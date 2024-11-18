import React from 'react';
export const CalendarContext = /*#__PURE__*/React.createContext(undefined);
const CalendarProvider = ({
  value,
  children
}) => {
  return /*#__PURE__*/React.createElement(CalendarContext.Provider, {
    value: value
  }, children);
};
export default CalendarProvider;
export const useCalendar = () => {
  const context = React.useContext(CalendarContext);
  if (context === undefined) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};
//# sourceMappingURL=CalendarProvider.js.map