import React from 'react';
export const HeaderContext = /*#__PURE__*/React.createContext(undefined);
export const useHeader = () => {
  const context = React.useContext(HeaderContext);
  if (context === undefined) {
    throw new Error('DayBarContext is not available');
  }
  return context;
};
//# sourceMappingURL=DayBarContext.js.map