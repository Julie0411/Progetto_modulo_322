import React, { useMemo } from 'react';
const TimezoneContext = /*#__PURE__*/React.createContext(undefined);
const TimezoneProvider = ({
  children,
  timeZone
}) => {
  const value = useMemo(() => ({
    timeZone
  }), [timeZone]);
  return /*#__PURE__*/React.createElement(TimezoneContext.Provider, {
    value: value
  }, children);
};
export default TimezoneProvider;
export const useTimezone = () => {
  const context = React.useContext(TimezoneContext);
  if (context === undefined) {
    throw new Error('TimeZoneContext is not available');
  }
  return context;
};
//# sourceMappingURL=TimeZoneProvider.js.map