import React from 'react';
export const BodyContext = /*#__PURE__*/React.createContext(undefined);
export const useBody = () => {
  const context = React.useContext(BodyContext);
  if (context === undefined) {
    throw new Error('BodyContext is not available');
  }
  return context;
};
//# sourceMappingURL=BodyContext.js.map