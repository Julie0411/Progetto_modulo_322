import { createContext, useContext } from 'react';
export const LoadingContext = /*#__PURE__*/createContext({
  isLoading: false
});
export const useLoading = () => {
  const {
    isLoading
  } = useContext(LoadingContext);
  return isLoading;
};
//# sourceMappingURL=LoadingContext.js.map